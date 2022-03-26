const app = getApp();
import CanvasDrag from '../../components/canvas-drag/canvas-drag';

Page({
  data: {
    bgPic: null,
    tapIndex: 0,
    imgList: [],
    graph: {},
  },

  onLoad: function (options) {
    let imgList = this.data.imgList
    for(let i = 0; i < 3; i++){
      imgList[i] = "/images/" + i + ".png";
    }
    this.setData({
      imgList:imgList
    })
    wx.showShareMenu({
      withShareTicket:true,
      menus:['shareAppMessage','shareTimeline']
    })
  },
  
  onReady: function () {
    //this.drawBgImg("/images/0.png")
  },

  onShow: function(){
    if(app.globalData.cropImg && app.globalData.cropImgFlag){
      app.globalData.cropImgFlag = false
      this.setData({
        graph: {
          w: 150,
          h: 150,
          type: 'image',
          url: app.globalData.cropImg
        }
      })
    }
  },

  selectImg: function (e) {
    var avatar = e.currentTarget.dataset.avatar;
    this.drawBgImg(avatar)
    // this.setData({
    //   graph: {
    //     w: 150,
    //     h: 150,
    //     type: 'image',
    //     url: avatar
    //   }
    // })
  },

  /**
   * 导出图片
   */
  onExport() {
    CanvasDrag.export().then((filePath) => {
      this.saveImage(filePath);
    }).catch((e) => {
      console.error(e);
    })
  },

  // 保存图片到相册
  saveImage: function (filepath) {
    var that = this;
    wx.showLoading({
      title: '保存中...',
    })
    wx.saveImageToPhotosAlbum({ //保存图片到相册
      filePath: filepath,
      success: res => {
        wx.showToast({
          title: '图片已存入相册',
          icon: "success",
          duration: 2000
        })
      },
      complete: res => {
        wx.hideLoading()
      }
    });
  },

  // 从相册选择
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: (res) => {
        this.avatarCrop(res.tempFilePaths[0])
      }
    })
  },

  //画背景图
  drawBgImg: function(url){
    wx.getImageInfo({
      src: url,
      success: function (res) {
        if(new Number(res.width) == new Number(res.height)){
          CanvasDrag.changeBgImage(url);
        }else{
          CanvasDrag.changeBgImageCut(url,res.width,res.height);
        }
      }
    })
  },
  
  // 获取用户头像
  getUserProfile: function (e) {
    wx.getUserProfile({
      desc: '请授权头像制作',
      success: res=>{
        let avatarUrl = res.userInfo.avatarUrl
        avatarUrl = avatarUrl.substring(0,avatarUrl.lastIndexOf("/")) + "/0"
        wx.getImageInfo({
          src: avatarUrl,
          success: res => {
            this.avatarCrop(res.path)
          }
        })
      }
    })
  },

  //剪辑头像
  avatarCrop:function(avatarUrl){
    wx.navigateTo({
      url: '/pages/crop/crop?avatar='+avatarUrl,
    })
  }


});
const app = getApp();
import CanvasDrag from '../../components/canvas-drag/canvas-drag';

Page({
  data: {
    bgPic: null,
    tapIndex: 0,
    graph: {},

    bgActive: "sbar-active",
    stickActive: "",
    scrollTabFlag: 0,
  },

  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket:true,
      menus:['shareAppMessage','shareTimeline']
    })

    let stickList = []
    for(let i = 0; i < imgList.length; i++){
      stickList[i] = "/images/s" + imgList[i] + ".png";
    }
    
    this.setData({
      stickList:stickList
    })
  },
  
  onReady: function () {
    this.drawBgImg("/images/avatar.png")
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


  // 获取用户头像
  selectWxStick: function (e) {
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
  
  // 从相册选择
  selectPhoneStick: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: (res) => {
        this.avatarCrop(res.tempFilePaths[0])
      }
    })
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
  
  //剪辑头像
  avatarCrop:function(avatarUrl){
    wx.navigateTo({
      url: '/pages/crop/crop?avatar='+avatarUrl,
    })
  }


});
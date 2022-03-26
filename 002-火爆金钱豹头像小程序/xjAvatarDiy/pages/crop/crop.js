// pages/crop/crop.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 200,//宽度
    height: 200,//高度
    disable_width:true,
    disable_height:true,
    disable_rotate:true,
    scale:5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.cropper = this.selectComponent("#image-cropper")
    this.setData({
      src: options.avatar,
    });
  },

  upload:function(){
    
  },

  submit: function (e){
    this.cropper.data.circle = false
    this.cropper.getImg((obj) => {
      app.globalData.cropImg = obj.url
      app.globalData.cropImgFlag = true
      wx.navigateBack(-1)
    });
  },

  submitCircle:function(e){
    this.cropper.data.circle = true
    this.cropper.getImg((obj) => {
      app.globalData.cropImg = obj.url
      app.globalData.cropImgFlag = true
      wx.navigateBack(-1)
    });
  },

  // 从相册选择
  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: (res) => {
        this.cropper = this.selectComponent("#image-cropper")
        this.setData({
          src: res.tempFilePaths[0],
        });
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
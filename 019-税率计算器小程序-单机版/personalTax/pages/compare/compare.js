// pages/compare/compare.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn1: "/images/btn1.png",
    btn2: "/images/btn2.png",
    cicle: "/images/circle.png",
    second: "/images/second.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      oldpayTax: options.oldpayTax,
      mewpayTax: options.newpayTax,
      shengMoney: options.shengMoney
    })

    wx.showShareMenu({
      withShareTicket: true
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },


  toShare:function(){
    var saveManey = this.data.shengMoney;
    wx.navigateTo({
      url: '../canvas/canvas?saveManey='+saveManey,
    })
  },

  comeBack:function(){
    wx.navigateBack({
  
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (){
    return {
      title: "新个税法通过，算算每年能省多少钱？",
      path: "/pages/index/index",
      imageUrl: app.CDN_URL + "shareCard.png"
    }
  }
})
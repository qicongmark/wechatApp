
var server = require("../../service/server.js");
var util = require("../../utils/util.js");
//获取应用实例
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //分享
    wx.showShareMenu({
      withShareTicket: true
    });

    this.setData({
      userInfo: app.globalData.userInfo
    });
    
  },

  //兑换奖品
  getReward: function(e){
    wx.navigateTo({
      url: '/pages/reward/reward',
    })
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
   * 挑战
   */
  replay: function () {
    //如果用户头像不存在
    if (util.isEmpty(app.globalData.userInfo.avatarurl)) {//更新用户信息
      server.updateUserInfo();
    }
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },

  //进入个人中心
  toindex: function (res) {
    wx.redirectTo({
      url: '/pages/index/index'
    });
  },

  //投诉
  handleComplain: function(res){
    wx.navigateTo({
      url: '/pages/complain/complain',
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var nickName = app.globalData.userInfo.nickname;
    if (!nickName) {
      nickName = "有人";
    }

    var imageUrl = app.RES_URL + "header-bg.png";
    return {
      title: "[" + nickName + "@我]，通关就能换话费，不费脑力，点点数字！",
      imageUrl: imageUrl,
      path: "/pages/index/index",
      success: res => {
      }
    }
  }
})
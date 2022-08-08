// pages/reward/reward.js
var server = require("../../service/server.js");
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

    server.getRewards(res=>{
      var rewards = res.data.data;
      for (var i = 0; i < rewards.length; i++){
        var item = rewards[i];
        item.itemBg = app.RES_URL + item.image + "?t=" + app.REFRESH_V;
      }
      this.setData({
        rewards: rewards
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 我的奖品
   */
  toMyReward: function() {
    wx.navigateTo({
      url: '/pages/rewardmy/rewardmy',
    })
  },

  /**
   * 兑换
   */
  doReward: function(e){
    var point = e.currentTarget.dataset.p;
    var id = e.currentTarget.dataset.i;
    this.setData({
      id: id
    });
    var mypoint = app.globalData.userInfo.mypoint;
    if (parseInt(mypoint) < parseInt(point)){
      wx.showToast({
        title: '积分不够',
        image: "../../images/x.png",
        duration: 2000
      });
    }else{
      this.setData({
        showModalStatus: true
      });
    }
  },

  /**
   * 取消
   */
  doCancel: function(){
    this.setData({
      showModalStatus: false
    });
  },

  /**
   * 表单提交
   */
  formSubmit: function (e){
    var id = this.data.id;
    var phone = e.detail.value["phone"];
    server.changeReward(id, phone,res=>{
      wx.showToast({
        title: '兑换成功',
        icon:"success",
        duration: 2000
      });
      app.globalData.userInfo = res.data.data;
      this.setData({
        showModalStatus: false,
        userInfo: app.globalData.userInfo
      });
    });
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
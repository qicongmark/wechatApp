
var server = require("../../service/server.js");
var util = require("../../utils/util.js");

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainImg: app.RES_URL + "header-bg.png?t=3"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //分享
    wx.showShareMenu({
      withShareTicket: true
    });

    

  },

  //开始挑战
  startplay: function(res){
    wx.redirectTo({
      url: '/pages/play/play'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log("====================== onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  //进入个人中心
  myhome: function(res){
    wx.redirectTo({
      url: '/pages/home/home'
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log("====================== onHide");
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

    var reviveArray = app.getTodayStorage(app.REVIVE_ARRAY_KEY);//复活数组
    var shareArray = app.getTodayStorage(app.SHARE_ARRAY_KEY);//挑战数组
    if (!reviveArray) {
      reviveArray = [];
    }
    if (!shareArray) {
      shareArray = [];
    }

    var imageUrl = app.RES_URL + "header-bg.png";
    return {
      title: "[" + nickName + "@我]，通关就能换话费，不费脑力，点点数字！",
      imageUrl: imageUrl,
      path: "/pages/index/index",
      success: res => {
        if (shareArray.length < 10) {
          if (res.shareTickets && res.shareTickets.length > 0){
            wx.login({
              success: loginRes => {
                var code = loginRes.code;
                wx.getShareInfo({
                  shareTicket: res.shareTickets,
                  success: res => {
                    var iv = res.iv;
                    var encryptedData = res.encryptedData;
                    server.encryptedDataOpenGId(code, iv, encryptedData, res => {
                      var openGId = res.data.data;
                      if (!util.arrayContains(reviveArray, openGId) && !util.arrayContains(shareArray, openGId)) {
                        wx.showToast({
                          title: '获取1次挑战机会',
                          icon: 'success',
                          duration: 2000
                        });
                        shareArray.push(openGId);
                        app.setTodayStorage(app.SHARE_ARRAY_KEY, shareArray);
                        
                        var that = this;
                        var fightcount = app.globalData.userInfo.fightcount;
                        server.updateFightCount("incre", res=>{
                          app.globalData.userInfo = res.data.data;
                          that.setData({
                            userInfo: app.globalData.userInfo
                          });
                        });
                      } else {
                        wx.showToast({
                          title: '此群已经分享过',
                          icon: 'success',
                          duration: 2000
                        });
                      }
                    });
                  }
                });
                
              }
            })

          }else{
            wx.showToast({
              title: '要分享到群哦~',
              icon: 'success',
              duration: 2000
            });
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '明天还有12次机会',
            showCancel:false,
            success: function (res) {
            }
          }) ;
        }
      }
    }
  }


})
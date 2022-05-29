// pages/daka/daka.js
var Calendar = require("../../service/Calendar.js");
var Server = require("../../service/Server.js");
var util = require("../../utils/util.js");

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenStepCanvas:false,
    bannerBg: app.RES_URL + "banner.png?t=1"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //分享
    wx.showShareMenu({
      withShareTicket: true
    });

    //处理按钮显示
    var date = new Date();
    var mymonth = date.getMonth() + 1;
    this.setData({
      mymonth: mymonth
    });

    //加载数据
    this.loadStepData();
        
  },

  /**
   * 加载本月数据
   */
  loadStepData: function(){
    
    wx.showLoading({
      title: '打卡中...',
    });
    wx.login({
      success: res => {
        var code = res.code;//code
        wx.getWeRunData({
          success: res => {
            var iv = res.iv;
            var encryptedData = res.encryptedData;

            //加载打卡数据，并实现打卡
            Server.encryptWeRunData(encryptedData, iv, code, res => {
              var data = res.data.data;
              app.globalData.openid = data.openid;
              var userinfo = data.userinfo;
              app.globalData.globalUserinfo = userinfo;
              
              //当前月的数据
              app.globalData.nowMonthStepList = data.stepList;
              var mystep = parseInt(data.step);
              
              this.setData({
                mystep: mystep
              });
              //画图
              this.drawerStepCanvas();
            });
          }
        });
      }
    });
    /**
    //静态数据测试
    this.setData({
      mystep: 6500
    });
    this.drawerStepCanvas();
    **/    
  },

  /**
   * 根据步数画图
   */
  drawerStepCanvas: function(){
    var winWidth = wx.getSystemInfoSync().windowWidth;
    ////创建并返回绘图上下文context对象
    var cxt_arc = wx.createCanvasContext('canvasArc');
    cxt_arc.beginPath();

    //计时器
    this.clearTimeInterval();//清除计时器
    var mystep = this.data.mystep;
    var that = this;
    var minPercent = Math.PI * 0.5;
    var maxPercent = Math.PI * (0.5 + (mystep / 10000) * 2);
    if (maxPercent > Math.PI * 2.5) {
      maxPercent = Math.PI * 2.5;
    }
    var curPercent = minPercent;
    var inter_id = setInterval(function () {
      if (curPercent >= maxPercent) {
        that.clearTimeInterval();
        that.setData({
          // scaletitle:"scale-title-cls",
          scalecls: "scale-cls"
        });
      } else {
        curPercent += 0.1;
        cxt_arc.setStrokeStyle('#40d07f');
        cxt_arc.setLineWidth(7);
        cxt_arc.setLineCap('round')
        cxt_arc.arc(105, 100, 88, minPercent, curPercent, false);
        cxt_arc.stroke();
        cxt_arc.draw();
      }
    }, 30);
    app.globalData.time_inter_ids.push(inter_id);//计时器数组
  },

  //清除所有计时器
  clearTimeInterval: function () {
    var ids = app.globalData.time_inter_ids;
    if (ids && ids.length > 0) {
      for (var i = 0; i < ids.length; i++) {
        clearInterval(ids[i]);
      }
    }
    app.globalData.time_inter_ids = [];
  },

  //清除某个计时器
  clearTimeIntervalById: function (inteId) {
    var ids = app.globalData.time_inter_ids;
    if (ids && ids.length > 0 && inteId) {
      for (var i = 0; i < ids.length; i++) {
        if (inteId == ids[i]){
          clearInterval(ids[i]);
        }
      }
    }
  },

  /**
   * 4月步数展示页面
   */
  tohome: function () {
    var globalUserinfo = app.globalData.globalUserinfo;
    // console.log(globalUserinfo);
    if (globalUserinfo && util.isEmpty(globalUserinfo.avatarurl)) {//授权
      wx.getUserInfo({
        success: res => {
          var userInfo = res.userInfo;
          //更新用户头像和昵称
          Server.updateUserinfo(0, 0, userInfo.nickName, userInfo.avatarUrl, res => {
            app.globalData.globalUserinfo.nickname = userInfo.nickName;
            app.globalData.globalUserinfo.avatarurl = userInfo.avatarUrl;
          });
          
          wx.navigateTo({
            url: '/pages/home/home'
          });
        }
      });
    }else{
      wx.navigateTo({
        url: '/pages/home/home'
      });
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})
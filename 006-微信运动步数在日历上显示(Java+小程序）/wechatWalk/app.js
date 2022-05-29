/**
 *app.js
 *更多免费视频教程、源码获取、如何赚钱：
 *关注公众号：程序员祁老司 
 *或者关注 “程序员祁老司” 的B站：
 *https://space.bilibili.com/305587632
 **/

var util = require("./utils/util.js");
var V = "1.0"; //版本

App({
  REFRESH_V: "1.0",
  
  //开发服务器的appid
  SERVER_APP_ID: "wechatWalk20200406",
  
  //服务器地址
  //HTTP_SERVER: "https://coder10.net/",
  //RES_URL: "https:/coder10.net/static/images/daka/",

  HTTP_SERVER: "http://localhost:8080/wechatWalkRest/",
  RES_URL: "http://localhost:8080/wechatWalkRest/static/images/walk/",
  
  //缓存
  CACHE_PREFIX: "DAKA_",
  
  globalData: {
    userInfo: {}
  },

  //小程序启动加载
  onLaunch: function () {

  },

  onHide: function () {

  },

  //获取当前版本号
  getVersion: function () {
    return V;
  },

  //成语的缓存 getter & setter
  getLocalStorage: function (key) {
    key = this.CACHE_PREFIX + V + key;
    return wx.getStorageSync(key);
  },

  //设置缓存
  setLocalStorage: function (key, value) {
    key = this.CACHE_PREFIX + V + key;
    wx.setStorageSync(key, value);
  },

  //删除缓存
  removeLocalStorage: function (key) {
    key = this.CACHE_PREFIX + V + key;
    wx.removeStorage({
      key: key,
      success: function (res) { },
    })
  },

  //获取缓存中今天的缓存
  getTodayStorage: function (key) {
    var dateStr = util.getDateStr(new Date());
    key = this.CACHE_PREFIX + V + key + "_" + dateStr;
    return wx.getStorageSync(key);
  },

  //重置缓存中的今天缓存
  setTodayStorage: function (key, value) {
    var dateStr = util.getDateStr(new Date());
    key = this.CACHE_PREFIX + V + key + "_" + dateStr;
    wx.setStorageSync(key, value);
  },
  
  //获取缓存中当月的缓存
  getMonthStorage: function (key) {
    var monthStr = util.getMonthStr(new Date());
    key = this.CACHE_PREFIX + V + key + "_" + monthStr;
    return wx.getStorageSync(key);
  },

  //重置缓存中当月的缓存
  setMonthStorage: function (key, value) {
    var monthStr = util.getMonthStr(new Date());
    key = this.CACHE_PREFIX + V + key + "_" + monthStr;
    wx.setStorageSync(key, value);
  },


})

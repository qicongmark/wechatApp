//app.js
var util = require("./utils/util.js");
const V = "1.0"; //版本

App({
  appname:"全民找热狗",
  CACHE_PREFIX: "SHUDAN_",

  //HTTP_SERVER: "http://localhost:8080/ocWechat/",
  HTTP_SERVER: "https://wxapp.xiguazuji.com/",
  CDN_URL: "https://zuji.weixinpy.com/bookList/",
  onLaunch: function () {
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

  globalData: {
    userInfo: null
  }
})

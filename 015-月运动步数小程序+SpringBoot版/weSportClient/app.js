//app.js
var util = require("./utils/util.js");

var V = "1.0"; //版本

App({
  REFRESH_V: "1.0",
  
  HTTP_SERVER: "http://localhost:8080/",
  
  //服务器地址
  //HTTP_SERVER: "https://jeeweixin.com/",
  
  //缓存
  CACHE_PREFIX: "DAKA_",
  
  globalData: {
    userInfo: {}
  },

  //小程序启动加载
  onLaunch: function () {

  },

  onHide: function () {

  }


})

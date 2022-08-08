//app.js
var push = require('./utils/pushsdk.js');

var util = require("./utils/util.js");
var V = "2.7"; //版本

App({
  REFRESH_V: "2.7",
  
  //缓存
  CACHE_PREFIX: "NUMBER_",
  FIGHT_COUNT_KEY: "_fight_count", //用户当天挑战次数
  NJ_DATA_KEY: "_njcaidata",   //缓存的数据
  RECOMMEND_KEY: "_recommend_data",   //缓存推广数据
  REWARD_KEY: "_reward_data",   //奖品
  REWARD_MY_KEY: "_reward_my",  //我的奖品

  SHARE_COUNT_KEY: "_share_count",//进入分享机会次数
  SHARE_ARRAY_KEY: "_share_array",//进入分享机会次数
  TODAY_SIGN_KEY:"_today_sign_key",//今日签到缓存
  REVIVE_ARRAY_KEY: "_revive_array", //复活数组

  globalData: {
    userInfo:{}
  },
  
  //小程序启动加载
  onLaunch: function () {
    
  },

  onHide: function(){
    
  },

  //获取用户信息
  getUserInfo: function (cb) {
    //已经登录
    if (this.globalData.sessionkey){
      cb(this.globalData.userInfo);
    } else {// 登录，获取用户openid
      wx.login({
        success: res => {
          var code = res.code;
          this.jscode2session(code, cb);
        }
      });
    }
  },

  //从服务器端获取openid，如果用户存在则获取用户信息
  jscode2session: function (code, cb) {
    wx.showLoading({
      title: '数据加载中...',
    })
    var cb_flag = false;
    wx.request({
      url: this.HTTP_SERVER + 'app/numrest/jscode2session.htm',
      data: {
        serverId: this.SERVER_ID,
        code: code
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        //处理数据
        this.globalData.userInfo = {};
        this.prepareGlobalData(res.data);
        //回调
        cb_flag = true;
        if (typeof cb === "function") {
          cb(this.globalData.userInfo);
        }
      },
      fail: function (res) {
        console.log("jscode2session fail");
      },
      complete: res => {
        wx.hideLoading();
      }
    });
  },
  
  prepareGlobalData: function (resData){
    this.globalData.sessionkey = resData.sessionkey;//sessionkey
    this.globalData.userInfo = resData.data;//用户信息
  },

  //重新绑定用户信息
  rebindUserInfo: function (res, cb) {
    var userInfo = res.detail.userInfo;
    if (userInfo) {
      this.globalData.userInfo.avatarUrl = userInfo.avatarUrl;
      this.globalData.userInfo.nickName = userInfo.nickName;
      this.globalData.userInfo.province = userInfo.province;
      if (typeof cb === "function") {
        cb();
      }
    } else {
      wx.showToast({
        title: '授权失败',
        mask: true,
        image: '../../images/error.png?t=1'
      });
    }
  },

  //根据授权获取用户信息
  getScopeUserInfo: function(cb){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo;
              //已经授权
              cb(userInfo);
            }
          });
        } else {
          cb(null);
        }
      }
    })
  },

  //获取当前版本号
  getVersion: function(){
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
    key = this.CACHE_PREFIX + V + key ;
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
  

})

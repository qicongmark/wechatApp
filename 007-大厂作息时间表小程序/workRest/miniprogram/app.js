//app.js
let util = require("./utils/util.js");
const cloud = wx.cloud
App({

  SEARCH_COUNT: "_search_count",

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: cloud.DYNAMIC_CURRENT_ENV,
        traceUser: true,
      })
    }
    
    this.globalData = {
      globalUserInfo: {}
    }

  }

})

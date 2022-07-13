//app.js
App({

  //服务器地址
  HTTP_SERVER: "http://localhost:8080/CalendarMvc/",
  //HTTP_SERVER: "https://yourdomain.net/",

  onLaunch: function () {
    
  },

  //获取用户openid
  //从服务器端获取openid，如果用户存在则获取用户信息
  jscode2session: function (cb) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var cb_flag = false;
        wx.request({
          url: this.HTTP_SERVER + 'xcx/rest/getOpenid.htm',
          data: {
            jscode: res.code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: res => {
            if (typeof cb === "function") {
              //将openid 设置在全局变量中
              this.globalData.openid = res.data;
              console.log('----------- openid = ' + this.globalData.openid);
              cb();//回调
            }
          },

          fail: function (res) {
            console.log("jscode2session fail");
          }
        });
      }
    });
  },

  globalData: {
    userInfo: null
  }
})
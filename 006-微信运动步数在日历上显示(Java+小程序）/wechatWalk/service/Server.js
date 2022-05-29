
/**
 * 从服务器获取数据用 load 开头
 */
const app = getApp();

//获取步数数据
function encryptWeRunData(encryptedData, iv, code, cb) {
  var mystep = app.getTodayStorage('mystep');
  if (!mystep){
    mystep = 1;
  }
  wx.request({
    url: app.HTTP_SERVER + 'rest/walk/encryptWeRunData.htm',
    method: "POST",
    data: {
      encryptedData: encryptedData,
      iv: iv,
      code: code,
      mystep: mystep
    },
    header: {
      'serverid': app.SERVER_APP_ID,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      if (typeof cb === "function") {
        cb(res);
      }
    },
    fail: function (res) {
      console.log(res);
    },
    complete(){
      wx.hideLoading();//数据加载完成
    }
  });
}

//同步用户数据
function getCalendarData(openid, year, month, cb) {
  wx.showLoading({
    title: '数据加载中...',
  });
  
  wx.request({
    url: app.HTTP_SERVER + 'rest/walk/getCalendarData.htm',
    method: "POST",
    data: {
      openid: openid,
      year: year,
      month: month
    },
    header: {
      'serverid': app.SERVER_APP_ID,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      if (typeof cb === 'function') {
        cb(res);
      }
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    },
    complete() {
      wx.hideLoading();//数据加载完成
    }
  });
}

//获取用户排行
function getRanks(cb) {
  wx.showLoading({
    title: '数据加载中...',
  });
  wx.request({
    url: app.HTTP_SERVER + 'rest/user/getRanks.htm',
    method: "POST",
    data: {
    },
    header: {
      'serverid': app.SERVER_APP_ID,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      cb(res);
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    },
    complete() {
      wx.hideLoading();//数据加载完成
    }
  });
}

/**
 * 保存用户信息
 */
function updateUserinfo(height, weight, nickname, avatarurl, cb){
  wx.request({
    url: app.HTTP_SERVER + 'rest/user/updateUserinfo.htm',
    method: "POST",
    data: {
      openid: app.globalData.openid,
      height: height,
      weight: weight,
      nickname: nickname,
      avatarurl: avatarurl
    },
    header: {
      'serverid': app.SERVER_APP_ID,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      if (typeof cb === 'function') {
        cb(res);
      }
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    }
  });
}

/**
 * 补打卡
 */
function doResignData(cb) {
  wx.showLoading({
    title: '数据处理中...',
  });
  wx.login({
    success: res => {
      var code = res.code;//code
      wx.getWeRunData({
        success: res => {
          var iv = res.iv;
          var encryptedData = res.encryptedData;
          wx.request({
            url: app.HTTP_SERVER + 'rest/walk/resignCalendarData.htm',
            method: "POST",
            data: {
              code: code,
              iv: iv,
              encryptedData: encryptedData
            },
            header: {
              'serverid': app.SERVER_APP_ID,
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              if (typeof cb === 'function') {
                cb(res);
              }
            },
            fail: function (res) {
              //console.log("uploadLocalCacheData failure");
            },
            complete() {
              wx.hideLoading();//数据加载完成
            }
          });
        }
      });
    }
  });
}


//获奖名单
function getRewardList(cb) {
  wx.showLoading({
    title: '数据加载中...',
  });
  wx.request({
    url: app.HTTP_SERVER + 'rest/user/getRewardList.htm',
    method: "POST",
    data: {
    },
    header: {
      'serverid': app.SERVER_APP_ID,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      cb(res);
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    },
    complete() {
      wx.hideLoading();//数据加载完成
    }
  });
}

//export
module.exports = {
  encryptWeRunData: encryptWeRunData,
  getCalendarData: getCalendarData,
  getRanks: getRanks,
  updateUserinfo: updateUserinfo,
  doResignData: doResignData,
  getRewardList: getRewardList
}




const app = getApp();


//更新用户挑战次数
function updateFightCount(ftype, cb) {
  wx.request({
    url: app.HTTP_SERVER + 'app/numrest/updateFightCount.htm',
    method: "POST",
    data: {
      serverId: app.SERVER_ID,
      ftype: ftype
    },
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      cb(res);
    },
    fail: function (res) {

    }
  });
}

//更新用户挑战结果
function updateFightResult(mylevel, mypoint , cb) {
  wx.request({
    url: app.HTTP_SERVER + 'app/numrest/updateFightResult.htm',
    method: "POST",
    data: {
      serverId: app.SERVER_ID,
      mylevel: mylevel,
      mypoint: mypoint
    },
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      cb(res);
    },
    fail: function (res) {

    }
  });
}

//同步用户信息
function updateUserInfo(cb) {
  app.getScopeUserInfo(function(userInfo){
    wx.request({
      url: app.HTTP_SERVER + 'app/numrest/updateUserInfo.htm',
      method: "POST",
      data: {
        serverId: app.SERVER_APP_ID,
        avatarurl: userInfo.avatarUrl,
        nickname: userInfo.nickName
      },
      header: {
        'sessionkey': app.globalData.sessionkey,
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
      },
      fail: function (res) {
      }
    });
  });
}

//获取用户排行
function getRanks(cb) {
  wx.request({
    url: app.HTTP_SERVER + 'wechat/njcai/rank/',
    method: "GET",
    data: {
      serverAppId: app.SERVER_APP_ID
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      cb(res);
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    }
  });
}

//获取奖品和推荐
function getRewards(cb) {
  wx.request({
    url: app.HTTP_SERVER + 'app/commonrest/getRewards.htm',
    method: "POST",
    data: {
      serverId: app.SERVER_ID
    },
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      cb(res);
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    }
  });
}

//获取我的奖品和推荐
function getMyRewards(cb) {
  wx.request({
    url: app.HTTP_SERVER + 'app/commonrest/getMyRewards.htm',
    method: "POST",
    data: {
      serverId: app.SERVER_ID
    },
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      cb(res);
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    }
  });
}

//兑换奖品
function changeReward(rid, phone, cb) {
  var openid = app.globalData.userInfo.openid;
  wx.request({
    url: app.HTTP_SERVER + 'app/commonrest/changeReward.htm',
    method: "POST",
    data: {
      serverId: app.SERVER_ID,
      rid: rid,
      phone: phone
    },
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      cb(res);
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    }
  });
}

function encryptedDataOpenGId(code, iv, encryptedData, cb){
  wx.request({
    url: app.HTTP_SERVER + 'app/numrest/encryptedDataOpenGId.htm',
    method: "POST",
    data: {
      serverId: app.SERVER_ID,
      code: code,
      iv: iv,
      encryptedData: encryptedData
    },
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      cb(res);
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    }
  });
}

function getRandomRewards(cb) {
  wx.request({
    url: app.HTTP_SERVER + 'app/commonrest/getRandomRewards.htm',
    method: "POST",
    data: {
      serverId: app.SERVER_ID
    },
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      cb(res);
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    }
  });
}

//投诉
function submitComplain(text,phone,cb) {
  wx.request({
    url: app.HTTP_SERVER + 'app/commonrest/submitComplain.htm',
    method: "POST",
    data: {
      serverId: app.SERVER_ID,
      text: text,
      phone: phone
    },
    header: {
      'sessionkey': app.globalData.sessionkey,
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      cb(res);
    },
    fail: function (res) {
      //console.log("uploadLocalCacheData failure");
    }
  });
}


//export
module.exports = {
  updateFightCount: updateFightCount,
  updateUserInfo: updateUserInfo,
  updateFightResult: updateFightResult,

  getRewards: getRewards,
  getMyRewards: getMyRewards,
  changeReward: changeReward,
  getRandomRewards: getRandomRewards,
  encryptedDataOpenGId: encryptedDataOpenGId,

  submitComplain: submitComplain
}



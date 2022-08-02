var util = require("./util.js");

const app = getApp();

//获取题库数据
function getConfig(cb) {
  wx.showLoading({
    title: '数据加载中...',
  });

  var flag = false;
  wx.request({
    url: 'https://zuji.weixinpy.com/0zuji/config.json',
    data: {},
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      if (res.data instanceof Array && typeof cb === "function"){
        cb(res);
      }
    },
    fail: function (res) {
    },
    complete: function(res){
      wx.hideLoading();
    }
  });
}

//上传formid
function uploadFormId(code, formid) {
  var flag = false;
  wx.request({
    url: app.HTTP_SERVER + 'app/zuji/submitformid.htm',
    data: { code:code, formid: formid},
    method: "POST",
    header: {
      'sessionkey': 'zujisk',
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
    },
    fail: function (res) {
    }
  });
}

//提交点击数
function submitClick(appid) {
  if (!appid){
    return;
  }

  var now = util.formatNow();
  console.log(now);

  var flag = false;
  wx.request({
    url: app.HTTP_SERVER + 'app/zuji/submitclick.htm',
    data: {
      appid: now + "-" + appid
    },
    method: "POST",
    header: {
      'sessionkey': 'zujisk',
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
    },
    fail: function (res) {
    }
  });
}

module.exports = {
  getConfig: getConfig,
  uploadFormId: uploadFormId,
  submitClick: submitClick
}


/**
 * 广告工具js
 */

const app = getApp();

//从cdn加载广告数据
function loadPromotAdvance(cb) {
  // if (!app.globalData.promotAdvance){
    wx.request({
      url: app.CDN_URL + 'bookList-advance.json?t=1',
      method: "GET",
      success: function (res) {
        app.globalData.promotAdvance = res.data;
        if (typeof cb === "function") {
          cb(res);
        }
      },

      fail: function (res) {
      }

    });
  // }
}

//统计用户点击数
function statisCount(code,fromappid) {
  if (!fromappid){
    fromappid = "";
  }
  wx.request({
    url: app.HTTP_SERVER + "app/commonrest/submitStatis.htm",
    method: "POST",
    header: {
      'content-type': 'application/json', // 默认值
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: {
      appname: app.appname | '',
      appid: "wxa8341404bb9e0ff5",
      sharetype: code,
      fromappid: fromappid
    },
    success: function () {

    },

    fail: function (res) {
    }

  });
}

module.exports = {
  loadPromotAdvance: loadPromotAdvance,
  statisCount: statisCount
}


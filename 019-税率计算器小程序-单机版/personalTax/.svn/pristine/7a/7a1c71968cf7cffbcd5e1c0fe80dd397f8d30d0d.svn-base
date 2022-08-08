const app = getApp();
//统计用户点击数
function userCount(sharetype, fromappid ) {
  if (!fromappid) {
    fromappid = "";
  }
    wx.request({
       url:app.HTTP_SERVER + "app/commonrest/submitStatis.htm",
        method: "POST",
        header: {
        'content-type': 'application/json', // 默认值
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        appname:app.appname|'',
        appid: "wxa8341404bb9e0ff5",
        sharetype: sharetype,  //点击保存分享朋友圈分享图
        fromappid: fromappid
      },
      success: function (res) {
        app.globalData.promotAmotAdvance = res.data;
        if (typeof cb === "function") {
          cb(res);
        }
      },
      fail: function (res) {
      }
  });
}
module.exports = {
  userCount: userCount
}
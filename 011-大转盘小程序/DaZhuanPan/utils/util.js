
const app = getApp();

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//获取随机数
function rand(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}

function doShare(title, path, that){
  return {
    title: '我免费获得了' + title + '源码，你也快来领吧！',
    success: function (res) {
      // console.log(res);
      if (res.shareTickets && res.shareTickets.length > 0){
        that.setData({
          showSource: true,
          downPath: getDownPath(path)
        });
      }else{
        wx.showToast({
          title: '分享到群获取',
          icon: 'success',
          duration: 2000
        });
      }
    }
  }
}

function getDownPath(path){
  var apps = app.globalData.apps;
  if (apps){
    for (var i = 0; i < apps.length; i++) {
      if (apps[i].path == path) {
        return apps[i].downPath;
      }
    }
  }
  return "联系微信：qicong88，发送源码";
}

module.exports = {
  formatTime: formatTime,
  doShare: doShare,
  rand: rand
}

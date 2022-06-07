function datetimeFormat(longTypeDate) {
  var dateTypeDate = "";
  var date = new Date();
  date.setTime(longTypeDate);
  dateTypeDate += date.getFullYear(); //年    
  dateTypeDate += "-" + getMonth(date); //月     
  dateTypeDate += "-" + getDay(date); //日    
  dateTypeDate += " " + getHours(date); //时    
  dateTypeDate += ":" + getMinutes(date); //分  
  dateTypeDate += ":" + getSeconds(date); //分  
  return dateTypeDate;
}

function getCurDay(){
  let date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  //var hour = date.getHours()
  //var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('')
}

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//返回 01-12 的月份值     
function getMonth(date) {
  var month = "";
  month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  return month;
}
//返回01-30的日期    
function getDay(date) {
  var day = "";
  day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  return day;
}
//小时  
function getHours(date) {
  var hours = "";
  hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  return hours;
}
//分  
function getMinutes(date) {
  var minute = "";
  minute = date.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  return minute;
}
//秒  
function getSeconds(date) {
  var second = "";
  second = date.getSeconds();
  if (second < 10) {
    second = "0" + second;
  }
  return second;
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//获取随机数
function rand(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}

//return "联系微信：qicong88，咨询服务";

function getRandom(min, max, count) {
  var originalArray = new Array
  var returnArr = new Array;
  for (let i = min; i < max; i++) {
    originalArray[i] = i + 1;
  }
  originalArray.sort(function () {
    return 0.5 - Math.random();
  });
  for (let i = 0; i < count; i++) {
    returnArr[i] = originalArray[i]
  }
  return returnArr
}

//判断是否为空,如果为空返回true，否则返回false
function isEmpty(text) {
  if (text == undefined || text == null || text == '' || text == 'null' || text == 'undefined') {
    return true;
  } else {
    text = text.replace(/(\s*$)/g, '');
    if (text == '') {
      return true;
    }
  }
  return false;
}

function formatBrTag(item) {
  if (!item) {
    return;
  }
  if (item instanceof Array) {
    for (let i in item) {
      //console.log(item[i].content)
      if (item[i].content) {
        item[i].content = item[i].content.replace(/\<br>/g, "\n")
        item[i].content = item[i].content.trim()
      }
    }
  } else {
    if (item.content) {
      item.content = item.content.replace(/\<br>/g, "\n")
      item.content = item.content.trim()
    }
  }
}

//打开pdf
function openPdf(fileUrl){
  wx.showLoading({
    title: '数据加载中',
  })
  wx.downloadFile({
    url: fileUrl,
    success: res => {
      if (res.statusCode === 200) {
        wx.openDocument({
          filePath: res.tempFilePath
        })
      }else{
        wx.showToast({
          title: '打开失败',
        })
      }
    },
    fail: res => {
      wx.showToast({
        title: '打开失败',
      })
    },
    complete: function(){
      wx.hideLoading();
    }
  })
}

module.exports = {
  formatTime: formatTime,
  formatBrTag: formatBrTag,
  datetimeFormat: datetimeFormat,
  getCurDay: getCurDay,
  rand: rand,
  getRandom: getRandom,
  isEmpty: isEmpty,
  openPdf: openPdf
}

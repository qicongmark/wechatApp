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

function getStepTips(step) {
  let rate = (step / 10000).toFixed(0)
  rate = 65 + new Number(rate)
  if (rate >= 100) {
    rate = 99
  }
  if (step < 100000) {
    return "您的运动量亚健康，超过了全国 " + rate + "% 的用户"
  } else if (step >= 100000 && step < 200000) {
    return "您的运动量很健康，超过了全国 " + rate + "% 的用户"
  } else if (step >= 200000 && step < 300000) {
    return "相当于每天爬一次珠峰，超过了全国 " + rate + "% 的用户"
  } else if (step >= 300000 && step < 400000) {
    return "相当于每天溜达一次西湖，超过了全国 " + rate + "% 的用户"
  } else {
    return "您在徒步全球吗？您超过了全国 99.9% 的用户"
  }
}

function formatItemBr(item) {
  if (!item) {
    return;
  }
  if (item instanceof Array) {
    for (let i in item) {
      console.log(item[i].content)
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

module.exports = {
  formatTime: formatTime,
  formatItemBr: formatItemBr,
  datetimeFormat: datetimeFormat,
  rand: rand,
  getRandom: getRandom,
  isEmpty: isEmpty,
  getStepTips: getStepTips
}

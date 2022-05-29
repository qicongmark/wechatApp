/**
 * 日历
 */
var Common = require("./Common.js");

/**
 * 根据日期获取打卡日历
 * 日期；
 * 已经签到的 日 
 * */
function getSignCalendar(paramDate, signDates) {
  var now = new Date();//当前时间
  var nowDate = now.getDate();
  var nowMonth = now.getMonth();
  var nowYear = now.getFullYear();

  var date = paramDate.getDate();//日期
  var month = paramDate.getMonth();//月
  var year = paramDate.getFullYear();//年
  var maxDate = getMaxDate(paramDate);//最大日期

  //判断月份和年份是否和当前时间一样
  if(nowMonth === month && nowYear === year){
    date = nowDate;
  }

  //获取日历
  var calendar = [];
  //日期对应月第一天
  paramDate.setDate(1);

  //星期：补充空格
  var firstDay = paramDate.getDay();
  while(firstDay-- > 0){
    var obj = { date: "", sign:false };
    calendar.push(obj);
  }

  var totalSteps = 0;
  var totalStepsValue = 0;
  var totalKms  = 0;
  var totalCaloris = 0;
  var totalDates = 0;
  //日期
  for(var i = 1; i <= maxDate; i++){
    var obj = {
      date: i,
      disabled:false
    };
    if (i < date || month < nowMonth || year < nowYear){//小于当前日期，disabled
      obj.disabled = true;
    }
    if (containsProp(signDates, i, obj)){//如果已经签到了 sign = true;
      obj.sign = true;
    }else{
      obj.sign = false;
    }
    calendar.push(obj);
    if (obj.tmpSteps){
      totalSteps += parseInt(obj.tmpSteps);
      totalStepsValue += parseInt(obj.tmpSteps);
      totalDates += 1;
    }
    if (obj.tmpKms){
      totalKms += parseFloat(obj.tmpKms);
    }
    if (obj.tmpCaloris){
      totalCaloris += parseFloat(obj.tmpCaloris);
    }
  }
  totalKms = totalKms.toFixed(1);
  totalCaloris = totalCaloris.toFixed(1);
  if (totalSteps > 10000){
    totalSteps = (totalSteps / 10000).toFixed(1) + "万";
  }
  if (totalCaloris > 1000){
    totalCaloris = (totalCaloris / 1000).toFixed(1) + "千";
  }
  return {
    totalStepsValue: totalStepsValue,
    totalSteps: totalSteps,
    totalKms: totalKms,
    totalCaloris: totalCaloris,
    calendar: calendar,
    totalDates: totalDates
  };
}
/**
 * 打卡处理
 */
function containsProp(array, day ,obj) {
  if (array) {
    var i = array.length;
    while (i--) {
      if (array[i]['kdate'] === day){
        var steps = array[i].steps;
        var kms = array[i].kms;
        var caloris = array[i].caloris;
        
        obj.tmpSteps = steps;
        obj.tmpKms = kms;
        obj.tmpCaloris = caloris;

        obj.steps = (steps / 10000).toFixed(1) + "w";
        if (steps >= 10000){
          return true;
        }else{
          return false;
        }
      }
    }
  }
  return false;
}

/**
 * 获取日历的最大日期
 */
function getMaxDate(paramDate){
  var year = paramDate.getFullYear();//年
  var month = paramDate.getMonth() + 1;//月

  if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
    return 31;
  } else if (month === 2 || month === 4 || month === 6 || month === 9 || month === 11) {
    return 30;
  } else {//2月（润月）
    return (year - 2000) % 4 === 0 ? 29 : 30;
  }
}

/**
 * 根据year、month、date获取日期
 */
function parseDate(year, month, date){
  if(parseInt(month) < 0){
    year = parseInt(year) - 1;
    month = 11;
  }
  if(parseInt(month) >= 12){
    year = parseInt(year) + 1;
    month = 0;
  }
  if (!date){
    date = 1;
  }
  return new Date(year, month, date);
}

module.exports = {
  getSignCalendar: getSignCalendar,
  getMaxDate: getMaxDate,
  parseDate: parseDate
}


let util = require("./util.js");

/**
 * 根据日期获取打卡日历
 * 日期；
 * 已经签到的 日 
 * */
function getSignCalendar(paramDate, signDates) {
  let now = new Date(); //当前时间
  let nowDate = now.getDate();
  let nowMonth = now.getMonth() + 1;
  let nowYear = now.getFullYear();

  let date = paramDate.getDate(); //日期
  let month = paramDate.getMonth() + 1; //月
  let year = paramDate.getFullYear(); //年
  let maxDate = getMaxDate(paramDate); //最大日期

  //判断月份和年份是否和当前时间一样
  if (nowMonth === month && nowYear === year) {
    date = nowDate;
  }

  //获取日历
  let calendar = [];
  //日期对应月第一天
  paramDate.setDate(1);

  //星期：补充空格
  let firstDay = paramDate.getDay();
  while (firstDay-- > 0) {
    let obj = {
      date: "",
      sign: false
    };
    calendar.push(obj);
  }

  let totalSteps = 0;
  for (let i = 1; i <= maxDate; i++) {
    let obj = {
      date: i
    };
    if (containsProp(signDates, nowMonth, i, obj)) {
      obj.sign = true;
    } else {
      obj.sign = false;
    }
    if (obj.tmpStep) {
      totalSteps += parseInt(obj.tmpStep);
    }
    calendar.push(obj)
  }
  let totalStep = totalSteps
  totalSteps = (totalSteps / 1000).toFixed(0) + "K";
  return {
    totalStep: totalStep,
    totalSteps: totalSteps,
    calendar: calendar
  };
}

/**
 * 打卡处理
 */
function containsProp(array, nowMonth, day, obj) {
  if (array) {
    var i = array.length;
    while (i--) {
      let monthDay = getMonthDay(array[i].timestamp * 1000)
      if (monthDay.month === nowMonth &&
        monthDay.day === day) {
        var step = array[i].step;
        obj.tmpStep = array[i].step;
        obj.step = (step / 1000).toFixed(1) + "k";
        if (step >= 10000) {
          return true;
        } else {
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
function getMaxDate(paramDate) {
  let year = paramDate.getFullYear(); //年
  let month = paramDate.getMonth() + 1; //月

  if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
    return 31;
  } else if (month === 2 || month === 4 || month === 6 || month === 9 || month === 11) {
    return 30;
  } else { //2月（润月）
    return (year - 2000) % 4 === 0 ? 29 : 30;
  }
}

/**
 * 根据year、month、date获取日期
 */
function parseDate(year, month, date) {
  if (parseInt(month) < 0) {
    year = parseInt(year) - 1;
    month = 11;
  }
  if (parseInt(month) >= 12) {
    year = parseInt(year) + 1;
    month = 0;
  }
  if (!date) {
    date = 1;
  }
  return new Date(year, month, date);
}

function getMonthDay(timestamp) {
  var date = new Date()
  date.setTime(timestamp)
  return {
    month: date.getMonth() + 1,
    day: date.getDate()
  }
}

module.exports = {
  getSignCalendar: getSignCalendar,
  getMaxDate: getMaxDate,
  parseDate: parseDate
}

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

function formatNow() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return [year, month, day].map(formatNumber).join('');
}

function getRand(citycount){
  const total =1000;
  if(citycount <2){
    return new Number((citycount * 100 / total).toFixed(1)) + 10;
  } else if (citycount>=2 && citycount <6){
    return new Number((citycount * 100 / total).toFixed(1)) + 30;
  }
  else if (citycount >=6 && citycount <10){
    return new Number((citycount * 100 / total).toFixed(1)) + 50;
  }
  else if (citycount >=10 && citycount <13) {
    return new Number((citycount * 100 / total).toFixed(1)) + 60;
  }
  else if (citycount >=13 && citycount <16) {
    return new Number((citycount * 100 / total).toFixed(1)) + 70;
  }
  else if (citycount >=16 && citycount <19) {
    return new Number((citycount * 100 / total).toFixed(1)) + 75;
  }
  else if (citycount >=19&& citycount <21) {
    return new Number((citycount * 100 / total).toFixed(1)) + 80;
  }
  else if (citycount >=21 && citycount <40){
    return new Number((citycount * 100 / total).toFixed(1)) + 85;
  }
  else if (citycount >=40){
    return 99.9;
  }
}

//是否包含
function arrayContains(arr, item) {
  for (var i in arr) {
    if (arr[i] === item) return true;
  }
  return false;
}

//获取随机数
function rand(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}

//获取日期
function getDateStr(date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(formatNumber).join('');
}

module.exports = {
  formatTime: formatTime,
  formatNow: formatNow,
  arrayContains: arrayContains,
  getRand: getRand,
  rand: rand,
  getDateStr: getDateStr
}


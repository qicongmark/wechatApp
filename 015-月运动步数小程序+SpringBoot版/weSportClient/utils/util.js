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

//获取日期
function getDateStr(date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(formatNumber).join('');
}

//获取月
function getMonthStr(date) {
  return [date.getFullYear(), date.getMonth() + 1].map(formatNumber).join('');
}

module.exports = {
  formatTime: formatTime,
  isEmpty: isEmpty,
  getDateStr: getDateStr,
  getMonthStr: getMonthStr
}

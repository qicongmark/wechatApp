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
};

//旧的应该纳税的个人工资
function oldAmount(gross_pay, insurance){
  // var gross_pay="税前工资",
  // var insurance="五险一金",
  return gross_pay - insurance-3500
}

//新的应该纳税的个人工资
function newAmount(gross_pay, insurance) {
  // var gross_pay="税前工资",
  // var insurance="五险一金",
  return gross_pay - insurance -5000
}

//旧的应该缴纳的税额
function oldPayTax(amount){
  if (amount <= 1500) {
    return amount * 0.03
  } else if (amount >1500 && amount <= 4500) {
    return amount * 0.1 - 105
  } else if (amount > 4500 && amount <= 9000) {
    return amount * 0.2 - 555
  } else if (amount > 9000 && amount <= 35000) {
    return amount * 0.25 -1005
  } else if (amount > 35000 && amount <= 55000) {
    return amount * 0.3 -2755
  } else if (amount > 55000 && amount <= 80000) {
    return amount * 0.35 - 5505
  } else if (amount > 80000) {
    return amount * 0.45 -13505
  }
}

//新的应该缴纳的税额
function newPayTax(amount){
  if (amount<=3000){
    return amount*0.03
  }else if(amount > 3000 && amount<=12000){
    return amount*0.1-210
  } else if (amount > 12000 && amount<=25000){
    return amount*0.2-1410
  } else if (amount > 25000 && amount<=35000){
    return amount*0.25-2660
  } else if (amount >35000 && amount <=55000){
    return amount*0.3-4410
  } else if (amount > 55000 && amount <= 80000){
    return amount*0.35-7160
  } else if (amount > 80000){
    return amount*0.45-15160
  }
}

module.exports = {
  formatTime: formatTime,
  oldAmount: oldAmount,
  newAmount: newAmount,
  oldPayTax: oldPayTax,
  newPayTax: newPayTax,
  isEmpty: isEmpty
}

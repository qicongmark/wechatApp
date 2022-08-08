
//将数组中某个对象的某个属性串起来
function getArrPropertyConcat(arr, property) {
  var str = "";
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    str += item[property];
  }
  return str;
}

//将数组中字符串拆解成单个字
function getSingleCharArray(arr) {
  var charArr = [];
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    charArr = charArr.concat(item.name.split(""));
  }
  return charArr;
}

//获取随机数
function rand(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}

//获取n个不重复的随机数
function randSet(Min, Max , Count){
  var myset = [];
  while (myset.length < Count){
    var r = rand(Min, Max);
    if (!arrayContains(myset, r)){
      myset.push(r);
    }   
  }
  return myset;
}

//克隆
function cloneObj(obj) {
  var copy = Object.assign({}, obj);
  return copy;
}

//获取日期
function getDateStr(date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(formatNumber).join('');
}

//格式化时间
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//是否包含
function arrayContains(arr, item){
  for (var i in arr) {
    if (arr[i] === item) return true;
  }
  return false;
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

function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {        //相邻元素两两对比
        var temp = arr[j + 1];        //元素交换
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

//export
module.exports = {
  getDateStr: getDateStr,
  getArrPropertyConcat: getArrPropertyConcat,
  getSingleCharArray: getSingleCharArray,
  rand: rand,
  randSet: randSet,
  cloneObj: cloneObj,
  arrayContains: arrayContains,
  isEmpty: isEmpty,
  bubbleSort: bubbleSort
}

/**
 * 业务js
 */
var util = require("../utils/util.js");
var server = require("../service/server.js");
const app = getApp();

//获取数据
function getQuestions(cursor, cb) {
  var test = {};
  cb(prepareCursorData(test, cursor));
}

function prepareCursorData(test, cursor) {
  if (null == test) {
    return null;
  }
  var selects = [];
  var count = 3;
  if (cursor >= 1 && cursor <= 10){
    count = 3;
  }else if(cursor > 10 && cursor <= 20){
    count = 4;
  }else{
    count = 5;
  }
  
  //数字
  var nums = util.randSet(-50, 50, count);
  nums = util.bubbleSort(nums);
  //背景图
  var pngs = util.randSet(1, 9, count);
  for(var i = 0; i < nums.length; i++){
    var itemBg = app.RES_URL + pngs[i] +".png";
    selects.push(getSelectObj(nums[i], itemBg));
  }
  for(var i = selects.length; i < 12; i++){
    selects.push(getSelectObj("", ""));
  }

  //打乱顺序
  selects.sort(function () { return 0.5 - Math.random() });
  selects.sort(function () { return 0.4 - Math.random() });

  for (var i in selects) {
    selects[i].id = i;
  }
  var target = {
    sortNums: nums,
    selects: selects,
    hidden: false
  }
  return target;
}

/**
* title：选项
* value ：对应的value
* answer ：答案 A|B|C
**/
function getSelectObj(value, itemBg) {
  return {
    value: value,
    itemBg: itemBg
  }
}

//从缓存中获取
function getTestFromLocalCache(cursor, key) {
  var localCacheData = app.getLocalStorage(key);
  if (localCacheData) {
    for (var i = 0; i < localCacheData.length; i++) {
      if (localCacheData[i].rowno === parseInt(cursor)) {
        return localCacheData[i];
      }
    }
  }
  return null;
}

//export
module.exports = {
  getQuestions: getQuestions
}


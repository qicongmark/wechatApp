
/**
 * 判断数组是否包含 item
 */
function contains(array, item){
  if (array){
    var i = array.length;
    while (i--) {
      if (array[i] === item) return true;
    }
  }
  return false;
}

module.exports={
  contains: contains
}

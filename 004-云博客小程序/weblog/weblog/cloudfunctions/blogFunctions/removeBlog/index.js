const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  
  // 获取基础信息
  const wxContext = cloud.getWXContext();
  let id = event.id //博客的id

  //自己判断这个openid，然后决定删除
  let _openid = wxContext.OPENID

  return await db.collection("blogs").doc(id).remove({
    data:id,
    success:res=>{
      return {
        res: res
      }
    }
  })
  
  
};

const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  
  // 获取基础信息
  const wxContext = cloud.getWXContext();
  let blog = event.blog
  blog._openid = wxContext.OPENID

  return await db.collection("blogs").add({
    data:blog,
    success:res=>{
      return {
        _id: blog._id
      }
    }
  })

  /**
  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }; */
  
};

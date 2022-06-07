// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const workArray = db.collection("work")

// 查询用户数据
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await workArray.where({
    _openid: wxContext.OPENID
  }).get({
    success: res=>{
      return {
        res:res
      }
    }
  })
  
}


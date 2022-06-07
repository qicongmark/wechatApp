// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const workArray = db.collection("work")

// 添加数据
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let workObj = event.workObj
  workObj._openid = wxContext.OPENID
  workObj.time = new Date().getTime()

  let secContent = workObj.company+workObj.depart+workObj.job+workObj.remark
  //校验内容
  const result = await cloud.openapi.security.msgSecCheck({
    "openid": wxContext.OPENID,
    "scene": 2,
    "version": 2,
    "content": secContent
  })

  // console.log(secContent)
  // console.log(result)

  if(result.result.suggest == 'pass'){
    //插入数据
    return await workArray.add({
      data:workObj,
      success: res=>{
        return {
          _id:workObj.id
        }
      }
    })
  }
  
}


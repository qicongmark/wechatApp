
function requestJson(fileid,cb){
  let tt = 17 //new Date().getMilliseconds()
  wx.cloud.getTempFileURL({
    fileList:[fileid],
    success: res=>{
      let tmpFile = res.fileList[0].tempFileURL + "?t="+tt
      //console.log("tmpFile = ", tmpFile)
      wx.request({
        url: tmpFile,
        success: jsonRes=>{
          if(cb){
            cb(jsonRes)
          }
        },
        fail:err=>{
          wx.showToast({
            title: '读取失败',
          })
        }
      })
    },
    fail:err=>{
      wx.showToast({
        title: '读取失败',
      })
    }
  })

}

module.exports={
  requestJson:requestJson
}


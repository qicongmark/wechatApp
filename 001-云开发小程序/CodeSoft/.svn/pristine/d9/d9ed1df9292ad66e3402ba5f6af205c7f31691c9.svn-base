// miniprogram/pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  openPDF: function () {

    wx.cloud.getTempFileURL({
      fileList: [{
        fileID: 'cloud://moban-0adc39.6d6f-moban-0adc39-1258743806/front.pdf'
      }]
    }).then(res => {
      console.log(res.fileList)
      let tempFileURL = res.fileList[0].tempFileURL
      wx.downloadFile({
        url: tempFileURL,
        success: res => {
          console.log(res.tempFilePath)
          if (res.statusCode === 200) {
            wx.openDocument({
              filePath: res.tempFilePath
            })
          }
        },
        fail: res => {
          console.log(res)
        }
      })
    }).catch(error => {
      // handle error
      console.log(error)
    })

  },

  handleLongPress: function () {
    wx.setClipboardData({
      data: 'coder10',
    })
  }
})
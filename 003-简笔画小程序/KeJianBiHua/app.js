//app.js
App({
  onLaunch: function () {
    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate(function (res) {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，请重启小程序',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        });

        updateManager.onUpdateFailed(function () {
          // 新版本下载失败
          wx.showModal({
            title: '更新失败',
            content: '请先删除小程序，再搜索打开',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        });
        
      }
    })

  },

  globalData: {
    userInfo: null
  }
  
})
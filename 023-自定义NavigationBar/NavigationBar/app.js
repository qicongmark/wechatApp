// app.js
App({
  onLaunch() {
    this.prepareNavigationBar()
  },
  globalData: {
    userInfo: null
  },

  
  //自定义NavigationBar
  prepareNavigationBar:function(){
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    const menuButton = wx.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏高度 + 44（适配所有机型）
    this.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
    this.globalData.navMenuRight = systemInfo.screenWidth - menuButton.right;
    this.globalData.navMenuTop = menuButton.top;
    this.globalData.navMenuHeight = menuButton.height;
  }
  
})

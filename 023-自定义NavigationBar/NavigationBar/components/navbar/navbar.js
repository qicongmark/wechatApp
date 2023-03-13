const app = getApp()
Component({

  properties: {
    showBack: false,
    title:'',
  },
  
  data: {
    navBarHeight: app.globalData.navBarHeight,
    navMenuRight: app.globalData.navMenuRight,
    navMenuTop: app.globalData.navMenuTop,
    navMenuHeight: app.globalData.navMenuHeight,
  },

  methods: {
    //返回
    doBack: function(e){
      wx.navigateBack()
    },

    //搜索页面
    toSearch: function (e) {
      wx.navigateTo({
        url: '/pages/search/search',
      })
    }
  },
  
  

})

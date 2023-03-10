// pages/yuan/yuan.js
const app = getApp()
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
    /**
    let yuanArray = [
      {id:"1",avatar:"/images/h1.png",authorCode:"mazhiyuan",author:"马致远",title:"天净沙·秋思",verses:["枯藤老树昏鸦，小桥流水人家。古道西风瘦马，夕阳西下，断肠人在天涯。"]},
      {id:"2",avatar:"/images/h2.png",authorCode:"guanhanqing",author:"关汉卿",title:"一枝花",verses:["攀出墙朵朵花，折临路枝枝柳。"]},
      {id:"3",avatar:"/images/h3.png",authorCode:"zhengguangzu",author:"郑光祖",title:"蟾宫曲·梦中作",verses:["半窗幽梦微茫，歌罢钱塘，赋罢高唐。"]},
      {id:"4",avatar:"/images/h4.png",authorCode:"baipu",author:"白朴",title:"天净沙·春",verses:["忘忧草，含笑花，劝君闻早冠宜挂。"]}
    ] */
    
    let yuanArray = app.poems.yuanQuArray
    this.setData({
      yuanArray:yuanArray
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
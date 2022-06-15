// pages/shici/ts/ts.js
const TS = require("./tsData.js")
/**
 * 更多小程序源码，关注公众号：祁大聪
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenHeight: 300,

    tsData: TS.tsdata
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        that.setData({
          screenHeight: res.windowHeight
        })
      },
    })

    this.setData({
      scArr: this.data.tsData[0].scArr
    })
  },

  //点击诗人 event
  clickItem: function(e){
    //console.log(e)
    var scArr = []
    var tsData = this.data.tsData
    var id = e.currentTarget.id
    for (var i = 0; i < tsData.length; i++ ){
      if (tsData[i].id == id){
        tsData[i].cls = "cur-shiren"
        scArr = tsData[i].scArr
      }else{
        tsData[i].cls = ""
      }
    }
    console.log(scArr);
    this.setData({
      tsData: tsData,
      scArr: scArr,
      curScItem:null
    })
  },

  //点击诗词
  clickScItem: function(e){
    //console.log(e)
    var curScItem = null;
    var id = e.currentTarget.id;

    for (var t = 0; t < this.data.tsData.length; t++){
      var scArr = this.data.tsData[t].scArr;
      for (var i = 0; i < scArr.length; i++) {
        if (scArr[i].id == id) {
          curScItem = scArr[i]
          break;
        }
      }
    }

    this.setData({
      curScItem: curScItem
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
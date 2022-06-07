// pages/user/user.js
const db = wx.cloud.database();
const app = getApp()
/**
 * 视频教程在公众号：祁大聪
 * QQ技术交流群：325025375
 */
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
    this.loadUserWork()
  },

  loadUserWork: function(){
    wx.showLoading({
      title: '数据加载中',
    })
    wx.cloud.callFunction({
      name:"quickstartFunctions",
      data:{
        "type":"queryUserWork"
      },
      success:res=>{
        if(res.result){
          //console.log(res)
          this.setData({
            workArray:res.result.data
          })
        }
      },
      complete:res=>{
        wx.hideLoading()
      }
    })
  },

  removeWork:function(e){
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success:sm=> {
        if (sm.confirm) {
          let id = e.currentTarget.dataset.id
          db.collection("work").doc(id).remove({
            success:res=>{
              let workArray = this.data.workArray
              for(let i in workArray){
                if(workArray[i]._id == id){
                  workArray.splice(i,1)
                  break;
                }
              }
              this.setData({
                workArray:workArray
              })
            },
            fail:console.error
          }) 
        }
      }
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
    this.loadUserWork()
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
let util = require("../../utils/util.js");
var app = getApp();
const db = wx.cloud.database();

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
    let bid = options.bid
    // let bid = '1629876425'
    if (bid) {
      this.setData({
        bid: bid
      })
      wx.showLoading({
        title: '数据加载中',
      })
      db.collection("blogs").doc(bid).get({
        success: res => {
          util.formatItemBr(res.data)
          this.setData({
            item: res.data
          })
        },
        complete: res => {
          wx.hideLoading()
        }
      })
    }
  },

  previewImg: function (e) {
    let url = e.currentTarget.dataset.url
    let imgList = [url]
    wx.previewImage({
      current: url,
      urls: imgList
    })
  },

  toBlogs: function () {
    wx.switchTab({
      url: '/pages/blogs/blogs',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return {
      title: '圈子精选',
      path: '/pages/blog/blog?bid=' + this.data.bid
    }
  }
})
// pages/src/src.js
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
    let sid = options.sid
    // let sid = 'cd045e756115479e05538d712c075ea2'//8937eaa9611544dd0454dfdc0b03315a
    if (sid) {
      this.setData({
        sid: sid
      })
      wx.showLoading({
        title: '数据加载中',
      })
      db.collection("coding-source").doc(sid).get({
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

  copy: function (e) {
    let content = this.data.item.content
    wx.setClipboardData({
      data: content
    })
  },

  toSrcs: function () {
    wx.switchTab({
      url: '/pages/mates/mates',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return {
      title: '非常棒的资源分享给你',
      path: '/pages/mate/mate?sid=' + this.data.sid
    }
  }
})
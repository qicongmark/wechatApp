// https://cdn.jsdelivr.net
let util = require("../../utils/util.js");

var app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogs: [],
    hasMore: true,
    pageStart: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadBlogs()
  },

  //加载资源
  loadBlogs: function () {
    if (!this.data.hasMore) {
      return;
    }
    //加载数据
    wx.showLoading({
      title: '数据加载中',
    })
    let pageStart = this.data.pageStart
    let query = db.collection("blogs")
    query.orderBy("createAt", "desc").skip(pageStart).limit(10).get({
      success: res => {
        if (res.data && res.data.length > 0) {
          let blogs = this.data.blogs
          util.formatItemBr(res.data)
          blogs = blogs.concat(res.data)
          this.setData({
            hasMore: true,
            blogs: blogs,
            pageStart: pageStart + 10
          })
        } else {
          this.setData({
            hasMore: false
          })
        }
      },
      complete: res => {
        wx.hideLoading()
      }
    })
  },

  previewImg: function (e) {
    let url = e.currentTarget.dataset.url
    console.log('url = ' + url)
    let imgList = [url]
    wx.previewImage({
      current: url,
      urls: imgList
    })
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
    this.loadBlogs()
  },

  doShare: function (e) {
    this.setData({
      bid: e.currentTarget.dataset.bid,
      img: e.currentTarget.dataset.img
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from == 'button') {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve({
            title: '圈子精选',
            imageUrl: this.data.img,
            path: '/pages/blog/blog?bid=' + this.data.bid
          })
        }, 100)
      })
      return {
        promise
      }
    }
    if (res.from == 'menu') {
      return {
        title: '圈子精选'
      }
    }
  }

})
// pages/index/index.js
let util = require("../../utils/util.js");
var app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentFlag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadCodingCategory()
    this.loadCodingSource('1001') //默认加载第一类
  },

  //加载编程分类
  loadCodingCategory: function () {
    wx.showLoading({
      title: '数据加载中',
    })
    db.collection("coding-category").get({
      success: res => {
        if (res.data) {
          this.setData({
            itemList: res.data,
            curCode: res.data[0].code
          })
        }
      },
      complete: res => {
        wx.hideLoading()
      }
    })
  },

  //加载资源
  loadCodingSource: function (code) {
    //加载数据
    wx.showLoading({
      title: '数据加载中',
    })
    let query = db.collection("coding-source")
    if (code) {
      code = new Number(code)
      query = query.where({
        category: code
      })
    }
    query.orderBy("sort", "desc").get({
      success: res => {
        if (res.data) {
          util.formatItemBr(res.data)
          this.setData({
            sourceList: res.data
          })
        }
      },
      complete: res => {
        wx.hideLoading()
      }
    })
  },

  changeItem: function (e) {
    let code = e.target.dataset.code
    this.setData({
      curCode: code,
      contentFlag: true
    })
    this.loadCodingSource(code)
  },

  clickSource: function (e) {
    let id = e.currentTarget.dataset.sid
    let sourceList = this.data.sourceList
    for (let i in sourceList) {
      if (sourceList[i]._id == id) {
        this.setData({
          curItem: sourceList[i]
        })
        break;
      }
    }
    this.setData({
      contentFlag: false
    })
  },

  goback: function (e) {
    this.setData({
      contentFlag: true,
      curItem: {}
    })
  },

  copy: function (e) {
    let content = this.data.curItem.content
    wx.setClipboardData({
      data: content
    })
  },

  previewImg: function (e) {
    let url = e.currentTarget.dataset.url
    let imgList = [url]
    wx.previewImage({
      current: url,
      urls: imgList
    })
  },

  doShare: function (e) {
    this.setData({
      sid: e.currentTarget.dataset.sid
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
            title: '非常棒的资源分享给你',
            path: '/pages/mate/mate?sid=' + this.data.sid
          })
        }, 100)
      })
      return {
        promise
      }
    }
  }

})

// pages/daka/daka.js
var Calendar = require("../../service/Calendar.js");
const app = getApp();

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
    let nowDate = new Date()
    this.initCalendar(nowDate)//加载日历
  },

  /**
   * 初始化日历，
   * signDates ： 已经签到的日期，一般在月份切换的时候从后台获取日期，
   * 然后在获取日历数据时，进行数据比对处理；
   * */
  initCalendar: function (paramDate, signDates) {

    //当前年月日
    var now = new Date();//当前时间
    var nowMonth = now.getMonth();
    var nowYear = now.getFullYear();

    var showSign = false;//是否显示签到按钮
    if (nowMonth === paramDate.getMonth()
      && nowYear === paramDate.getFullYear()) {
      showSign = true;
    }

    //未来签到日期设置为空
    if (nowMonth < paramDate.getMonth()
      && nowYear <= paramDate.getFullYear()) {
      signDates = [];
    }

    //星期
    var days = ["日", "一", "二", "三", "四", "五", "六"];

    //签到日历数据的生成
    var calendars = Calendar.getSignCalendar(paramDate, signDates);

    this.setData({
      signDates: signDates,
      year: paramDate.getFullYear(),
      month: paramDate.getMonth() + 1,
      calendars: calendars,
      days: days,
      preMonth: "<",   //大于、小于号不可以直接写在wxml中
      nextMonth: ">",
      showSign: showSign
    });
  },

  //上个月
  preMonth: function () {
    var dataYear = this.data.year;
    var dataMonth = this.data.month - 2;//月是从0开始的
    var paramDate = Calendar.parseDate(dataYear, dataMonth);
    this.initCalendar(paramDate);
  },

  //下个月
  nextMonth: function () {
    var dataYear = this.data.year;
    var dataMonth = this.data.month;
    var paramDate = Calendar.parseDate(dataYear, dataMonth);
    this.initCalendar(paramDate);
  },

  onClick:function(){
    wx.showToast({
      title: '生日快乐',
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
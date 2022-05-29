// pages/daka/daka.js
var Calendar = require("../../service/Calendar.js");
var Server = require("../../service/Server.js");
var util = require("../../utils/util.js");

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
    try{
      var nowDate = new Date();
      //获取打卡的数据
      this.initCalendar(nowDate, null);
    }catch(e){}
  },

  //初始化日历
  initCalendar: function (paramDate, signDates) {
    //当前年月日
    var now = new Date();//当前时间
    var nowMonth = now.getMonth();
    var nowYear = now.getFullYear();
    if (app.globalData.openid) {
      var openid = app.globalData.openid;
      var year = paramDate.getFullYear();
      var month = paramDate.getMonth();

      if (signDates){
        //渲染数据
        this.renderCalendar(paramDate, signDates);
      }else{
        //从后台获取当前年月-打卡
        Server.getCalendarData(openid, year, month + 1, res => {
          //已签到日期
          var signDates = [];
          if (res.data.data) {
            signDates = res.data.data;
          }
          //渲染数据
          this.renderCalendar(paramDate, signDates);
        });
      }
    }
  },

  //渲染数据
  renderCalendar: function (paramDate, signDates){
    //星期
    var days = ["日", "一", "二", "三", "四", "五", "六"];
    //签到日历
    var calendarObj = Calendar.getSignCalendar(paramDate, signDates);
    this.setData({
      signDates: signDates,
      year: paramDate.getFullYear(),
      month: paramDate.getMonth() + 1,
      calendarObj: calendarObj,
      days: days
    });

    //是否隐藏下个月
    this.hiddenNextMonth();
  },

  //上个月
  preMonth: function () {
    var dataYear = this.data.year;
    var dataMonth = this.data.month - 2;//月是从0开始的
    var paramDate = Calendar.parseDate(dataYear, dataMonth);
    this.initCalendar(paramDate);

    //是否隐藏下个月按钮
    this.hiddenNextMonth();
  },

  //下个月
  nextMonth: function () {
    var dataYear = this.data.year;
    var dataMonth = this.data.month;
    var paramDate = Calendar.parseDate(dataYear, dataMonth);
    this.initCalendar(paramDate);

    //是否隐藏下个月按钮
    this.hiddenNextMonth();
  },

  //是否隐藏下个月按钮
  hiddenNextMonth: function(){
    var dataYear = this.data.year;
    var dataMonth = this.data.month;

    var now = new Date();//当前时间
    var nowDate = now.getDate();
    var nowMonth = now.getMonth();
    var nowYear = now.getFullYear();

    if (dataMonth > nowMonth && dataYear >= nowYear) {
      this.setData({
        hiddenNext: true
      });
    } else {
      this.setData({
        hiddenNext: false
      });
    }
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
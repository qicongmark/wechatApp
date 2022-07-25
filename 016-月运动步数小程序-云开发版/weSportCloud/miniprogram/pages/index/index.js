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
    wx.getWeRunData({
      success: res => {
          wx.showLoading({
              title: '数据加载中',
          })
          
          const cloudID = res.cloudID
          
          wx.cloud.callFunction({
              name: "quickstartFunctions",
              data: {
                  type: "getWeRunData",
                  weRunData: wx.cloud.CloudID(cloudID)
              },
              success: runRes => {
                  if (runRes.errMsg.includes('ok')) {
                      let result = runRes.result.weRunData.data; //最近一个月的步数数据
                      
                      let now = new Date()
                      let stepInfoList = []

                      for(let obj of result.stepInfoList){
                        let tmpDate = new Date(obj.timestamp*1000)
                        if(now.getMonth() == tmpDate.getMonth()){
                          obj.date = tmpDate.getDate()
                          stepInfoList.push(obj)
                        }
                      }

                      //console.log(result)
                      // 初始化本月步数日历
                      app.globalData.nowMonthStepList = stepInfoList
                      this.initCalendar(now)
                      
                  }
              },
  
              complete: res => {
                  wx.hideLoading()
              }
              
          })
      }
    })

  },

  //初始化日历
  initCalendar: function (paramDate, signDates) {
    //当前年月日
    var now = new Date();//当前时间
    var nowMonth = now.getMonth();
    var nowYear = now.getFullYear();
    if (app.globalData.nowMonthStepList) {
      var nowMonthStepList = app.globalData.nowMonthStepList;
      var year = paramDate.getFullYear();
      var month = paramDate.getMonth();

      //渲染数据
      this.renderCalendar(paramDate, nowMonthStepList);
      
    }
  },

  //渲染数据
  renderCalendar: function (paramDate, signDates){
    //星期
    var days = ["日", "一", "二", "三", "四", "五", "六"];
    //数据日历
    var calendarObj = Calendar.getSignCalendar(paramDate, signDates);
    //console.log(calendarObj);
    this.setData({
      signDates: signDates,
      year: paramDate.getFullYear(),
      month: paramDate.getMonth() + 1,
      calendarObj: calendarObj,
      days: days
    });
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

// pages/tiku/tiku.js
var servicePlay = require("../../service/service_play.js");
var server = require("../../service/server.js");
var util = require("../../utils/util.js");
var audio = require("../../utils/audio.js");

const beginAudio = audio.createAudio("begin.mp3");
const clickAudio = audio.createAudio("click.mp3");
const failAudio = audio.createAudio("fail.mp3");
const successAudio = audio.createAudio("success.mp3");

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareCount:0,
    //背景图原来是从服务器加载的，开发者自行替换吧
    fightAlert: app.RES_URL + "fight-alert.png?t=5"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //分享
    wx.showShareMenu({
      withShareTicket: true
    });
    this.setData({
      precountStart:true,
      countTime: true,
      preTimeCount:3,
      mypoint: 0
    });

    this.countStartTimeInterval();
  },

  //初始化数据
  initData: function (cursor) {
    if(cursor === 31){
      wx.showToast({
        title: '通关了！',
      })
      return;
    }
    
    servicePlay.getQuestions(cursor, question => {
      var curTime = this.getCountTime(cursor);
      this.setData({
        cursor: cursor,//当前题目
        curTime: curTime,
        protoCurTime: curTime,//原始的时间，用于计算进度条百分比
        progressPercent: 100,
        showModalStatus: false,
        showShareBtn:true,
        showConfirmBtn:false,
        showContentModalStatus:false,
        finished: false,
        sortNums: question.sortNums,
        selects: question.selects
      });
      //开始计时
      if(cursor > 1){
        this.countTimeInterval();
      }

    });
  },
  
  //获取计时时间
  getCountTime: function (cursor){
    var curTime = 5;
    if(cursor > 26 && cursor < 29){
      curTime = 2; 
    } else if (cursor == 29){
      curTime = 1.5
    } else if (cursor == 30){
      curTime = 1;
    }
    return curTime;
  },
  
  //选中
  doSelect: function (e) {
    if (this.data.finished) {//答案已出
      return;
    }
    var value = e.target.dataset.v;
    if (value === ''){
      return;
    }
    var sortNums = this.data.sortNums;
    if (this.data.cursor === 1 && sortNums.length === 3) {
      this.countTimeInterval();
    }
    if(sortNums[0] === parseInt(value)){//值相等
      this.hiddenBtn(parseInt(value));//隐藏按钮
      sortNums.shift();
      if (sortNums.length === 0){//最后一个，进入下一题
        //关闭声音
        clickAudio.stop();
        failAudio.stop();
        successAudio.stop();
        //成功音效
        successAudio.play();

        var cursor = parseInt(this.data.cursor);
        var mypoint = parseInt(this.data.mypoint);
        if(app.globalData.userInfo.mypoint > 2000){
          mypoint += 1;
        }else{
          mypoint += 10;
        }
        this.setData({
          resultImg: "right.png",
          showContentModalStatus: true,
          mypoint: mypoint
        });

        //清理计时
        this.clearTimeInterval();
        setTimeout(function(){
          this.setData({
            showContentModalStatus:false
          });
          this.initData(cursor + 1);
        }.bind(this),500);
      }else{
        //关闭声音
        clickAudio.stop();
        failAudio.stop();
        successAudio.stop();
        //播放音效
        clickAudio.play();
      }
    }else{
      //关闭声音
      clickAudio.stop();
      failAudio.stop();
      successAudio.stop();
      //失败音效
      failAudio.play();

      this.playFailure();
    }
  },


  //答题 时间倒计时
  countTimeInterval: function () {
    this.clearTimeInterval();//清除计时器

    var selects = this.data.selects;
    var curTime = this.data.curTime;
    var protoCurTime = this.data.protoCurTime;

    var that = this;
    var inter_id = setInterval(function () {
      if (curTime <= 0) {
        this.playFailure();
      } else {
        curTime -= 1 / 20;
        var progressPercent = parseInt(curTime * 100 / protoCurTime).toFixed(2);
        this.setData({
          progressPercent: progressPercent
        })
      }
    }.bind(this), 50);
    app.globalData.time_inter_ids.push(inter_id);//计时器数组
  },

  //答题失败
  playFailure: function(){
    
    //开始计时
    this.clearTimeInterval();
    //更新积分和关卡数
    var mylevel = parseInt(this.data.cursor);
    var mypoint = parseInt(this.data.mypoint);
    
    //35关，或者已经复活了2次
    if (this.data.cursor > 25 || this.data.shareCount >= 2) {
      this.setData({
        resultImg: "wrong.png",
        showContentModalStatus: true
      });
      wx.redirectTo({
        url: '/pages/failure/failure?mylevel=' + mylevel + "&mypoint=" + mypoint
      });
    } else {
      //结束，挑战失败
      this.setData({
        progressPercent: 0,
        finished: true,
        showModalStatus: true,
        showModalTime: 30
      });
      //弹出层倒计时
      this.showTimeInterval();
    }
  },

  //弹出层倒计时
  showTimeInterval: function(){
    //更新积分和关卡数
    var mylevel = this.data.cursor;
    var mypoint = this.data.mypoint;

    var that = this;
    var inter_id = setInterval(function () {
      var showModalTime = that.data.showModalTime;
      if (showModalTime <= 1) {
        that.clearTimeInterval();//清除计时器
        wx.redirectTo({
          url: '/pages/failure/failure?mylevel=' + mylevel + "&mypoint=" + mypoint
        })
        that.setData({
          showModalStatus: false
        });
      } else {
        showModalTime -= 1;
        that.setData({
          showModalTime: showModalTime
        });
      }
    }, 1000);

    app.globalData.time_inter_ids.push(inter_id);//计时器数组
  },

  //设置为是否隐藏
  hiddenBtn: function(value){
    var selects = this.data.selects;
    for(var i = 0; i < selects.length; i++){
      if (selects[i].value === value){
        selects[i].hidden = true;
        break;
      }
    }
    this.setData({
      selects: selects
    });
  },

  //开始倒计时
  countStartTimeInterval: function (cursor) {
    this.clearTimeInterval();//清除计时器
    var that = this;
    var curTimeCount = this.data.preTimeCount;
    var inter_id = setInterval(function () {
      if (curTimeCount <= 1) {
        that.clearTimeInterval();//清除计时器
        //开始答题
        that.setData({
          countTime:false
        });
        if (cursor == undefined){
          cursor = 1
        }
        that.initData(cursor);
      } else {
        curTimeCount -= 1;
        that.setData({
          preTimeCount: curTimeCount
        });
        if(curTimeCount == 2){
          beginAudio.play();
        }
      }
    }, 1000);
    app.globalData.time_inter_ids.push(inter_id);//计时器数组
  },

  
  //清除所有计时器
  clearTimeInterval: function () {
    var ids = app.globalData.time_inter_ids;
    if (ids && ids.length > 0) {
      for (var i = 0; i < ids.length; i++) {
        clearInterval(ids[i]);
      }
    }
    app.globalData.time_inter_ids = [];
  },

  /**
   * 继续挑战
   */
  restart: function(){
    //开始答题
    this.setData({
      showShareBtn: true,
      showConfirmBtn:false,
      showModalStatus:false
    });
    this.initData(this.data.cursor);
  },

  /**
   * 返回首页
   */
  toindex: function(){
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },

  /**
  * 关闭弹出层
  */
  redirectFailure: function () {
    this.clearTimeInterval();//清除计时器
    var mylevel = this.data.cursor;
    var mypoint = this.data.mypoint;
    wx.redirectTo({
      url: '/pages/failure/failure?mylevel=' + mylevel + "&mypoint=" + mypoint
    })
  },

  /**
   * 继续挑战
   */
  replay: function(){
    var that = this;
    //挑战次数减一，并返回是否有挑战机会
    this.initData(1);
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
    this.clearTimeInterval();//清除计时器

    var nickName = app.globalData.userInfo.nickname;
    if (!nickName){
      nickName = "有人";
    }

    var reviveArray = app.getTodayStorage(app.REVIVE_ARRAY_KEY);//复活数组
    var shareArray = app.getTodayStorage(app.SHARE_ARRAY_KEY);//挑战数组
    if (!reviveArray) {
      reviveArray = [];
    }
    if (!shareArray){
      shareArray = [];
    }
    var imageUrl = app.RES_URL + "share.png";
    return {
      title: "马上领到50元话费了，点一下帮忙我！~",
      path: "/pages/index/index",
      imageUrl: imageUrl,
      success: res => {
        if (res.shareTickets && res.shareTickets.length > 0) {
          wx.login({
            success: loginRes=>{
              var code = loginRes.code;

              wx.getShareInfo({
                shareTicket: res.shareTickets,
                success: res => {
                  var iv = res.iv;
                  var encryptedData = res.encryptedData;
                  server.encryptedDataOpenGId(code, iv, encryptedData, res => {
                    var openGId = res.data.data;
                    if (!util.arrayContains(reviveArray, openGId) && !util.arrayContains(shareArray, openGId) ) {
                      this.setData({
                        showModalStatus: false,
                        showShareBtn: true,
                        showConfirmBtn: false,
                        countTime: true,
                        shareCount: this.data.shareCount + 1,
                        preTimeCount: 3,
                        precountReStart: true,
                        precountStart: false
                      });

                      reviveArray.push(openGId);
                      app.setTodayStorage(app.REVIVE_ARRAY_KEY, reviveArray);
                      this.clearTimeInterval();//清除计时器
                      this.countStartTimeInterval(this.data.cursor);//倒计时开始
                    } else {
                      wx.showToast({
                        title: '此群已经分享过',
                        icon: 'success',
                        duration: 2000
                      });
                    }
                  });
                }
              })
              
            }
          });
         
        } else {
          wx.showToast({
            title: '要分享到群哦~',
            icon: 'success',
            duration: 2000
          });
        }
      },
      complete:res=>{
        //继续倒计时
        this.showTimeInterval();
      }
    }
  }

})
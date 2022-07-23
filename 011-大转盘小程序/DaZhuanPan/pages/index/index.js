
/**
 * 大转盘抽奖
 */

var util = require("../../utils/util.js");
var app = getApp();

Page({

  //奖品配置
  awardsConfig: {
    chance: true
  },
  
  data: {
    awardsList: {},
    animationData: {},
    btnDisabled: '',
    showModalStatus: false,
    drawSetting:{
      "rate1":1,
      "rate2":1,
      "rate3":2,
      "rate4":1,
      "rate5":4,
      "rate6":1
    }
  },

  onShow: function(e){
    //刷新抽奖配置
    this.awardsConfig.awards = [
      {'id':'"rate1"', 'index': 1, 'name': '烧烤' },
      {'id':'"rate2"', 'index': 2, 'name': '喝水' },
      {'id':'"rate3"', 'index': 3, 'name': '跑步' },
      {'id':'"rate4"', 'index': 4, 'name': '满汉全席' },
      {'id':'"rate5"', 'index': 5, 'name': '水果' },
      {'id':'"rate6"', 'index': 6, 'name': '甜点' }
    ]
    this.drawAwardRoundel()
    
    //设置抽奖概率
    this.setDrawRate()
  },

  //设置中奖概率
  setDrawRate: function(){
    var drawSetting = this.data.drawSetting
    var drawRateIndexArr = []
    if (drawSetting.rate1 > 0){
      for (var i = 0; i < drawSetting.rate1; i++){
        drawRateIndexArr.push(0)
      }
    }

    if (drawSetting.rate2 > 0) {
      for (var i = 0; i < drawSetting.rate2; i++) {
        drawRateIndexArr.push(1)
      }
    }

    if (drawSetting.rate3 > 0) {
      for (var i = 0; i < drawSetting.rate3; i++) {
        drawRateIndexArr.push(2)
      }
    }

    if (drawSetting.rate4 > 0) {
      for (var i = 0; i < drawSetting.rate4; i++) {
        drawRateIndexArr.push(3)
      }
    }

    if (drawSetting.rate5 > 0) {
      for (var i = 0; i < drawSetting.rate5; i++) {
        drawRateIndexArr.push(4)
      }
    }

    if (drawSetting.rate6 > 0) {
      for (var i = 0; i < drawSetting.rate6; i++) {
        drawRateIndexArr.push(5)
      }
    }
    // console.log(drawRateIndexArr)
    this.setData({
      drawRateIndexArr: drawRateIndexArr
    })
  },


  onReady: function (e) {
    
  },

  //画抽奖圆盘
  drawAwardRoundel: function () {
    var awards = this.awardsConfig.awards;
    var awardsList = [];
    var turnNum = 1 / awards.length;  // 文字旋转 turn 值

    // 奖项列表
    for (var i = 0; i < awards.length; i++) {
      awardsList.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awards[i].name });
    }

    this.setData({
      btnDisabled: this.awardsConfig.chance ? '' : 'disabled',
      awardsList: awardsList
    });
  },

  //发起抽奖
  playReward: function () {
    
    //中奖index
    // console.log(this.data.drawRateIndexArr.length)
    var randIndex = util.rand(0, this.data.drawRateIndexArr.length-1)
    var awardIndex = this.data.drawRateIndexArr[randIndex] //2
    // console.log(awardIndex + " , " + randIndex)
    var runNum = 8;//旋转8周
    var duration = 4000;//时长

    // 旋转角度
    this.runDeg = this.runDeg || 0;
    this.runDeg = this.runDeg + (360 - this.runDeg % 360) + (360 * runNum - awardIndex * (360 / 6))
    //创建动画
    var animationRun = wx.createAnimation({
      duration: duration,
      timingFunction: 'ease'
    })
    animationRun.rotate(this.runDeg).step();
    this.setData({
      animationData: animationRun.export(),
      btnDisabled: 'disabled'
    });

    // 中奖提示
    var awardsConfig = this.awardsConfig;
    setTimeout(function () {
      var awardContent = awardsConfig.awards[awardIndex].name
      wx.showModal({
        title: '今晚夜宵吃',
        content: awardContent,
        showCancel: false
      });
      this.setData({
        btnDisabled: ''
      });

    }.bind(this), duration);

  }

})

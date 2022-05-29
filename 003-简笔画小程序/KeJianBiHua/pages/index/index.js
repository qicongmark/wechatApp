/**
 * 简笔画
 * 关注公众号：祁大聪
 * 源码技术交流qq群：
 */

var util = require("../../utils/util.js");

// pages/jbh/jbh.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demoImg:'../../images/1.png',
    demoIndex:1,
    copyName:'临摹'
  },

  penConfig: {
    fontSize: 4,
    color: '#000000'
  },

  drawActions: [], //所有画笔actions
  curActions: [], //当期这笔actions

  //加载
  onLoad: function(options) {
    this.setData({
      curColor: this.penConfig.color,
      curSize: this.penConfig.fontSize
    })

    //分享
    wx.showShareMenu({
      withShareTicket: false
    });

    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        let canvasWidth = (res.screenWidth - 8) * 2
        let canvasHeight = (res.screenHeight - 200) * 2
        if (res.model.indexOf('iPad') > -1){
          canvasHeight = canvasHeight - 120
        }
        that.setData({
          canvasWidth: canvasWidth,
          canvasHeight: canvasHeight,
          screenWidth: canvasWidth/2,
          screenHeight: canvasHeight/2
        });
        
        that.context = wx.createCanvasContext('myCanvas');
        that.context.drawImage("../../images/bg.png", 0, 0, 100, 100, 0, 0, canvasWidth, canvasHeight); 
      },
    })
  },

  //选择画笔
  penSelect: function(e) {
    this.penConfig.fontSize = e.currentTarget.dataset.p;
    //console.log(this.penConfig.fontSize);
    this.setData({
      curSize: this.penConfig.fontSize
    })
  },

  //选择颜色
  colorSelect: function(e) {
    this.penConfig.color = e.currentTarget.dataset.p;
    // console.log(this.penConfig.color);
    this.setData({
      curColor: this.penConfig.color
    })
  },

  touchStart: function(e) {
      //得到触摸点的坐标
      this.startX = e.changedTouches[0].x;
      this.startY = e.changedTouches[0].y;
      
      this.context.setStrokeStyle(this.penConfig.color);
      this.context.setLineWidth(this.penConfig.fontSize);
      this.context.setLineCap('round'); // 让线条圆润 
      this.context.beginPath();
    
  },

  //手指触摸后移动
  touchMove: function(e) {
    var tmpX = e.changedTouches[0].x;
    var tmpY = e.changedTouches[0].y;
    this.context.moveTo(this.startX, this.startY);
    this.context.lineTo(tmpX, tmpY);
    this.context.stroke();
    this.startX = tmpX;
    this.startY = tmpY;

    //画图
    var tmpActions = this.context.getActions();
    // console.log(tmpActions);
    this.curActions.push(tmpActions);
    wx.drawCanvas({
      canvasId: 'myCanvas',
      reserve: true,
      actions: tmpActions // 获取绘图动作数组
    });

  },

  //touch结束
  touchEnd: function (e) {
    
    if (this.curActions && this.curActions.length > 0) {
      this.drawActions.push(this.curActions);
      this.curActions = []; //清空此笔画action
    }

  },

  //橡皮擦
  erase: function (e) {
    this.penConfig.fontSize = 5;
    this.penConfig.color = '#FFF';
  },

  //清除
  doClear: function(e){
    this.clearCanvas()
    this.drawActions = []
    if (this.copyFlag) this.drawDemo()
  },

  //清除画布
  clearCanvas: function () {
    let canvasWidth = this.data.canvasWidth
    let canvasHeight = this.data.canvasHeight
    let tmpPenData = this.penConfig;
    this.context.drawImage("../../images/bg.png", 0, 0, 100, 100, 0, 0, canvasWidth, canvasHeight);
    this.context.draw();
    //还原画笔设置
    this.penConfig = tmpPenData;
  },

  //撤销
  revoke: function() {
    this.clearCanvas();
    this.drawActions.pop(); //撤销1笔actions
    this.reDrawActions();
  },

  //重新画drawActions
  reDrawActions: function(){
    for (var i = 0; i < this.drawActions.length; i++) {
      for (var j = 0; j < this.drawActions[i].length; j++) {
        wx.drawCanvas({
          canvasId: 'myCanvas',
          reserve: true,
          actions: this.drawActions[i][j]
        });
      }
    }
  },

  //更换图片
  changeImg: function(e){
    var demoIndex = e.currentTarget.dataset.p;
    demoIndex = demoIndex+1;
    if (demoIndex > 14){
      demoIndex = 1;
    }
    this.setData({
      demoIndex: demoIndex,
      demoImg: "../../images/" + demoIndex + ".png"
    });
    if (this.copyFlag) {
      this.drawDemo()
    }
  },

  //临摹图片
  doCopy: function(e){
    if (this.copyFlag === undefined){
      this.drawDemo()
      this.setData({
        copyName: '取消'
      })
      this.copyFlag = true
      this.drawActions = []
      return;
    }

    if (this.copyFlag){
      this.clearCanvas()
      this.setData({
        copyName:'临摹'
      })
    }else{
      this.drawDemo()
      this.setData({
        copyName: '取消'
      })
    }
    this.reDrawActions()
    this.copyFlag = !this.copyFlag   
  },

  //临摹图片
  drawDemo: function(){
    let copyDemoImg = "../../images/copy-" + this.data.demoIndex + ".png"
    let cWidth = this.data.screenWidth * 0.8
    let cHeight = this.data.screenHeight * 0.8
    this.context.drawImage(copyDemoImg, 0, 0, 185, 185, (this.data.screenWidth - cWidth) / 2, (this.data.screenHeight - cWidth) / 2, cWidth, cWidth)
    this.context.draw()
    this.setData({
      copyDemoImg: copyDemoImg
    })
  },
  
  //保存canvas图片
  saveCanvas: function (e) {
    wx.showLoading({
      title: '图片保存中...',
    });

    //去掉临摹图
    if(this.copyFlag){
      this.clearCanvas();
      this.reDrawActions();
    }
    
    // this.context.drawImage("../../images/code.png", 0, 0, 258, 258, this.data.screenWidth - 63, this.data.screenHeight - 63, 60, 60); 
    this.context.fillText('祁大聪讲编程 小程序', this.data.screenWidth - 150, this.data.screenHeight - 6)
    this.context.draw(true,drawRes =>{
      //画图
      this.drawImageShowForSave(res => {
        this.setData({
          hiddenCanvas: true
        });
        this.data.imagePath = res.tempFilePath;
        this._saveImageAlbum();
      });
    });

  },

  /**
   * 保存图片
   */
  _saveImageAlbum: function () {
    var filePath = this.data.imagePath;
    wx.saveImageToPhotosAlbum({
      filePath: filePath,
      success: res => {
        wx.showToast({
          title: '已保存到相册',
          icon: 'success',
          duration: 1000
        });
      },
      complete: function (res) {
        //图片保存完成
        setTimeout(function () {
          wx.hideLoading();
        }.bind(this), 2000)
      }
    });
  },

  drawImageShowForSave: function (cb) {
    var destWidth = this.data.canvasWidth;
    var destHeight = this.data.canvasHeight;
    
    wx.canvasToTempFilePath({
      destWidth: destWidth,
      destHeight: destHeight,
      width: destWidth,
      height: destHeight,
      canvasId: 'myCanvas',
      success: function (res) {
        if (cb) {
          cb(res);
        }
      },
      complete: function (res) {

      }
    });
  },

  onShareAppMessage: function() {
    return {
      title: "简笔画学习，小孩成人都适用",
      path: "/pages/index/index"
    }
  }

})
// pages/canvas/canvas.js
const app = getApp();
var ClickingStatistics = require("../../utils/ClickingStatistics.js");
var statics = require("./staticdata.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: app.CDN_URL + 'QRcode.png',
    thirdbg: app.CDN_URL + 'thirdbg.png ',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var saveAmt = options.saveManey;
    var rangeImgMapping = statics.staticdata();
    for (var i = 0; i < rangeImgMapping.length; i++) {
      var mappingItem = rangeImgMapping[i];
      var low = mappingItem.low;
      var high = mappingItem.high;
      if (saveAmt >= low && saveAmt <= high) {
        var imgPathArr = mappingItem.imgPathArr;
        var randomIndex = parseInt((Math.random() * (imgPathArr.length)));
        var randomImag = app.CDN_URL + imgPathArr[randomIndex].imgPath;
        wx.getImageInfo({
          src: randomImag,
          success: res => {
            wx.getImageInfo({
              src: app.CDN_URL + 'QRcode.png',
              success: QRes => {
                this.data.QRcode = QRes.path;
                this.drawImage(saveAmt,res.path);
              },
              fail: res => {
              }
            });
          },
          complete: res => {
            //this._drawShareImg();
          }
        });
      }
    }
    // this.drawImage(saveAmt);
  },
  // getImgPathForSaveAmt: function (saveAmt) {

  // },
  
  drawImage: function (saveAmt,path){
   var qrsrc = this.data.QRcode;
   var destWidth = 1050;
   var destHeight = 1770;
   const ctx = wx.createCanvasContext('shareCanvas');
   ctx.drawImage("../../images/canvasbg.png", 0, 0,destWidth, destHeight);
   ctx.setFillStyle("#fee759");
   ctx.font = "bold 100px Arial";
   ctx.fontWidth ="bold";
   ctx.fillText("￥"+saveAmt,550,360);
    ctx.drawImage(qrsrc,780,1300,200,200);
    ctx.drawImage(path,113,390,780,800);
   var that = this;
   ctx.draw(true, res => {
     if (that.data.iphone) {//ios机型
       wx.canvasToTempFilePath({
         width: destWidth,
         height: destHeight,
         destWidth: destWidth,
         destHeight: destHeight,
         canvasId: 'shareCanvas',
         success: function (res) {
           that.setData({
             hiddenCanvas: true,
             imagePath: res.tempFilePath
           });
         
         },
         complete: function (res) {
           wx.hideLoading();
         }
       });
     } else { //安卓使用懒加载  延迟100
       setTimeout(function () {
         wx.canvasToTempFilePath({
           width: destWidth,
           height: destHeight,
           destWidth: destWidth,
           destHeight: destHeight,

           canvasId: 'shareCanvas',
           success: function (res) {
             that.setData({
               hiddenCanvas: true,
               imagePath: res.tempFilePath
             });
            
           },
           complete: function (res) {
             wx.hideLoading();
           }
         });
       }, 200)
     }

   });

 },

 //重来一次
  doCancel:function(){
    wx.navigateBack({
      delta:2
    })
  },

  //保存图片
    saveImg: function () {
      var filePath = this.data.imagePath;

      wx.saveImageToPhotosAlbum({
        filePath: filePath,
        success: res => {
          wx.showToast({
            title: '已保存到相册',
            icon: 'success',
            duration: 2000
          });
          this.setData({
            hiddenCanvas: true
          });

        },
          file: res => {
        }
      });
      ClickingStatistics.userCount(1001);  //统计保存次数 1001 点击保存朋友圈分享图
    },
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "新个税法通过，算算每年能省多少钱？",
      path: "/pages/index/index",
      imageUrl: app.CDN_URL+"shareCard.png"
    }

  },

  //点击 分享到群
  onshares: function () {
    ClickingStatistics.userCount(1002); //统计转发次数 1002 点击分享到群

  }
})
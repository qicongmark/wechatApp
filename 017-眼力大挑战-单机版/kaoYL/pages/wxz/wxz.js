var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curnum: 36,
    timeout: 5.00,
    startFlag:false,
    showMask: true,
    showTimeout: false,
    showTimeoutModule: false,

    mapArray:[
      {img:"../../images/1.png",curimg:"../../images/1-1.png", num:36},
      {img:"../../images/2.png",curimg:"../../images/2-1.png", num:36}
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中',
    })

    let curIndex = 0;//默认从0开始
    this.prepareMap(curIndex);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  changetime: function () {
    var timer = this.data.timer;
    var time = this.data.time;
    var timeFixed = (parseFloat(time) - 0.1).toFixed(1);
    this.setData({
      time: timeFixed
    })
    if (this.data.time <= 0) {
      clearInterval(timer);
      this.setData({
        showTimeoutModule: true
      })
    }
  },

  start: function () {
    this.setData({
      time: this.data.timeout,
      showMask: false,
      startFlag:true,
      showTimeout: false,
      showTimeoutModule: false
    })
    var timer = setInterval(this.changetime, 100);
    this.setData({
      timer: timer
    })
  },

  //重新开始
  restart: function () {
    this.prepareMap(this.data.curIndex);
    this.start()
  },

  //下一关：在mapArray中添加数组即可
  next: function(){
    let curIndex = this.data.curIndex
    curIndex += 1
    this.prepareMap(curIndex);
    this.start()
  },

  select: function (e) {
    if (e.currentTarget.dataset.name == this.data.curItem.curimg) {
      var timer = this.data.timer;
      clearInterval(timer);
      var restime = this.data.time;
      var second = (5.00 - restime).toFixed(2);
      var persent = (Number(restime) * 30).toFixed(2);
      if (Number(persent) > 100) {
        persent = 99 + Number((Number(persent) / 1000).toFixed(2));
      }
      if (Number(persent) < 0.98) {
        persent = Math.random() * 40
      }
      this.setData({
        second: second,
        persent: persent,
        showTimeout: true
      })
    } else {
      wx.showToast({
        title: '错了哦',
      })
    }
  },

  prepareMap: function (curIndex) {
    let curItem = this.data.mapArray[curIndex]
    let num = curItem.num
    var curMap = [];
    for (var i = 0; i < num; i++) {
      curMap.push(curItem.img)
    }
    var randx = Math.floor(curItem.num * Math.random());
    curMap.splice(randx, 1, curItem.curimg);
    this.setData({
      curIndex:curIndex,
      curItem:curItem,
      curMap: curMap
    })
  },

  handleLoad: function () {
    wx.hideLoading()
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
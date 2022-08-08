// pages/complain/complain.js
var server = require("../../service/server.js");
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      { id: 1, text: "欺诈", selected: false },
      { id: 2, text: "色情", selected: false },
      { id: 3, text: "政治谣言", selected: false },
      { id: 4, text: "诱导分享", selected: false },
      { id: 5, text: "恶意营销", selected: false },
      { id: 6, text: "隐私信息收集", selected: false }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //分享
    wx.showShareMenu({
      withShareTicket: true
    });
  
  },

  //点击选择
  showSelect: function(e){
    var d = e.currentTarget.dataset.d;
    var items = this.data.items;
    for(var i  = 0 ; i < items.length; i++){
      if (items[i].id == parseInt(d)){
        items[i].selected = !items[i].selected;
        break;
      }
    }
    this.setData({
      items: items
    });
  },

  //提交表单
  formSubmit: function (e) {
    var phone = e.detail.value["phone"];
    var items = this.data.items;
    var text = "";
    for(var i = 0; i < items.length; i++){
      if(items[i].selected){
        text += items[i].text + " , ";
      }
    }
    if (util.isEmpty(text)){
      wx.showToast({
        title: '请选择投诉原因',
        icon: "success",
        duration: 2000
      });
      return;
    }
    
    server.submitComplain(text, phone, res => {
      wx.showToast({
        title: '投诉成功',
        icon: "success",
        duration: 2000
      });
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
    var nickName = app.globalData.userInfo.nickname;
    if (!nickName) {
      nickName = "有人";
    }

    var imageUrl = app.RES_URL + "header-bg.png";
    return {
      title: "[" + nickName + "@我]，通关就能换话费，不费脑力，点点数字！",
      imageUrl: imageUrl,
      path: "/pages/index/index",
      success: res => {
      }
    }
  }

})
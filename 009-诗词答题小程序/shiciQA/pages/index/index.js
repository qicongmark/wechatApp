// pages/demoSc/demoSc.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    scTitle:"锄禾日当午",

    scEmptyBtns: [],

    words:[
      "我", "汗", "你","滴","第","禾","和", "下","土","士"
    ]
  },

  initEmptyBtn:function(){
    return [
      { text: "", index: 0 },
      { text: "", index: 1 },
      { text: "", index: 2 },
      { text: "", index: 3 },
      { text: "", index: 4 }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      scEmptyBtns:this.initEmptyBtn()
    })
  },

  //点击待选择的汉字
  handleClickWord: function(e){
    //console.log("------------------")
    //console.log(e.currentTarget.dataset.w)

    let fullFlag = true
    let curWord = e.currentTarget.dataset.w

    for (var i = 0; i < this.data.scEmptyBtns.length; i++){
      if (this.data.scEmptyBtns[i].text == ""){
        this.data.scEmptyBtns[i].text = curWord
        if(i < 4){
          fullFlag = false
        }
        break;
      }
    }

    if (fullFlag){
      let answer = ""
      for (let item of this.data.scEmptyBtns) {
        answer += item.text
      }
      
      if (answer == "汗滴禾下土"){
        wx.showToast({
          title: '回答正确',
        })
      }else{
        wx.showToast({
          title: '回答错误',
        })
      }
     
    }
    this.setData({
      scEmptyBtns: this.data.scEmptyBtns
    })

  },

  //清空
  clean: function(e){
    this.setData({
      scEmptyBtns: this.initEmptyBtn()
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
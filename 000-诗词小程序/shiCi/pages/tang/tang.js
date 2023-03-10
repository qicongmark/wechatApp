// pages/tang/tang.js
// 获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[
      {"image":"/images/s1.png",type:"tangshi",id:"1"},
      {"image":"/images/s2.png",type:"songci",id:"1"},
      {"image":"/images/s3.png",type:"yuanqu",id:"1"}
    ],
    poemAuthors:[
      {authorCode:null,author:"全部"},
      {authorCode:"libai",author:"李白"},
      {authorCode:"dufu",author:"杜甫"},
      {authorCode:"baijuyi",author:"白居易"},
      {authorCode:"wangwei",author:"王维"},
      {authorCode:"lishangyin",author:"李商隐"},
      {authorCode:"wangchangling",author:"王昌龄"},
      {authorCode:"menghaoran",author:"孟浩然"},
      {authorCode:"dumu",author:"杜牧"},
      {authorCode:"wangzhihuan",author:"王之涣"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.preparePoems(null)

  },

  getAuthorPoems: function(e){
    let code = e.currentTarget.dataset.code
    this.setData({
      activeCode: code
    })
    this.preparePoems(code)
  },

  preparePoems: function(authorCode){
    /**
    let tangShiArray = [
      {id:"1",authorCode:"libai",author:"李白",title:"静夜思",verses:["床前明月光","疑是地上霜","举头望明月","低头思故乡"]},
      {id:"2",authorCode:"libai",author:"李白",title:"黄鹤楼送孟浩然之广陵",verses:["故人西辞黄鹤楼","烟花三月下扬州","孤帆远影碧空尽","唯见长江天际流"]},
      {id:"3",authorCode:"libai",author:"李白",title:"望庐山瀑布",verses:["日照香炉生紫烟","遥看瀑布挂前川","飞流直下三千尺","疑是银河落九天"]},
      {id:"4",authorCode:"dufu",author:"杜甫",title:"春夜喜雨",verses:["好雨知时节","当春乃发生","随风潜入夜","润物细无声"]},
      {id:"5",authorCode:"dufu",author:"杜甫",title:"绝句",verses:["两个黄鹂鸣翠柳","一行白鹭上青天","窗含西岭千秋雪","门泊东吴万里船"]},
      {id:"6",authorCode:"baijuyi",author:"白居易",title:"赋得古原草送别",verses:["离离原上草","一岁一枯荣","野火烧不尽","春风吹又生"]},
      {id:"7",authorCode:"wangwei",author:"白居易",title:"相思",verses:["红豆生南国","春来发几枝","愿君多采撷","此物最相思"]},
      {id:"8",authorCode:"dumu",author:"杜牧",title:"清明",verses:["清明时节雨纷纷","路上行人欲断魂","借问酒家何处有","牧童遥指杏花村"]},
      {id:"9",authorCode:"lishangyin",author:"李商隐",title:"无题·相见时难别亦难",verses:["相见时难别亦难","东风无力百花残","春蚕到死丝方尽","蜡炬成灰泪始干"]}
    ] */

    let tangShiArray = app.poems.tangShiArray
    
    if(authorCode){
      let tempArray = [];
      for(let i in tangShiArray){
        if(tangShiArray[i].authorCode == authorCode){
          tempArray.push(tangShiArray[i])
        }
      }
      this.setData({
        tangShiArray:tempArray
      })
    }else{
      this.setData({
        tangShiArray:tangShiArray
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")
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
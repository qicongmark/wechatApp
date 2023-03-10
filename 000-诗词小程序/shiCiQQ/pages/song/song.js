// pages/song/song.js
// 获取应用实例
const app = getApp()

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
    let poemAuthors = [
      {authorCode:"sushi",author:"苏轼"},
      {authorCode:"liqingzhao",author:"李清照"},
      {authorCode:"xinqiji",author:"辛弃疾"},
      {authorCode:"liuyong",author:"柳永"},
      {authorCode:"ouyangxiu",author:"欧阳修"},
      {authorCode:"luyou",author:"陆游"}
    ]
    let activeCode = poemAuthors[0].authorCode
    this.setData({
      poemAuthors:poemAuthors,
      activeCode: activeCode
    })
    //页面加载的时候，加载第一个诗人的作品
    this.preparePoems(activeCode)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  getPoemAuthor: function(e){
    let code = e.currentTarget.dataset.code
    this.setData({
      activeCode: code
    })
    this.preparePoems(code)
  },

  preparePoems(code){
    /**
    let songCiArray = [
      {id:"1",authorCode:"sushi",author:"苏轼",title:"水调歌头·明月几时有",verses:["明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间","转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。"],img:"/images/s4.png"},
      {id:"2",authorCode:"sushi",author:"苏轼",title:"念奴娇·赤壁怀古",verses:["大江东去，浪淘尽，千古风流人物","故垒西边，人道是，三国周郎赤壁。","乱石穿空，惊涛拍岸，卷起千堆雪。","江山如画，一时多少豪杰。"]},
      {id:"3",authorCode:"liqingzhao",author:"李清照",title:"声声慢·寻寻觅觅",verses:["寻寻觅觅，冷冷清清，凄凄惨惨戚戚。乍暖还寒时候，最难将息。三杯两盏淡酒，怎敌他、晚来风急！雁过也，正伤心，却是旧时相识。","满地黄花堆积，憔悴损，如今有谁堪摘？守着窗儿，独自怎生得黑！梧桐更兼细雨，到黄昏、点点滴滴。这次第，怎一个愁字了得！"], img:"/images/s5.png"},
      {id:"4",authorCode:"liqingzhao",author:"李清照",title:"一剪梅·红藕香残玉簟秋",verses:["红藕香残玉簟秋。轻解罗裳，独上兰舟。云中谁寄锦书来？雁字回时，月满西楼","花自飘零水自流。一种相思，两处闲愁。此情无计可消除，才下眉头，却上心头"]},
      {id:"5",authorCode:"xinqiji",author:"辛弃疾",title:"青玉案·元夕",verses:["东风夜放花千树，更吹落、星如雨。宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。","蛾儿雪柳黄金缕，笑语盈盈暗香去。众里寻他千百度，蓦然回首，那人却在，灯火阑珊处。"], img:"/images/s6.png"},
      {id:"6",authorCode:"xinqiji",author:"辛弃疾",title:"破阵子·为陈同甫赋壮词以寄之",verses:["醉里挑灯看剑，梦回吹角连营。八百里分麾下炙，五十弦翻塞外声，沙场秋点兵。","马作的卢飞快，弓如霹雳弦惊。了却君王天下事，赢得生前身后名。可怜白发生！"]}
    ] */
    
    let songCiArray = app.poems.songCiArray

    let tmpArray = []
    for(let i in songCiArray){
      if(songCiArray[i].authorCode == code){
        tmpArray.push(songCiArray[i])
      }
    }
    this.setData({
      poems:tmpArray 
    })
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
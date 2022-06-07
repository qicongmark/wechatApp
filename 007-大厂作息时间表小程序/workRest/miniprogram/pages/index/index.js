// pages/work/work.js
const app = getApp()
const db = wx.cloud.database();
let util = require("../../utils/util.js");
/**
 * 视频教程在公众号：祁大聪
 * QQ技术交流群：325025375
 */
Page({

  /**
   * 页面的初始数据
   */
  pageNum:1,
  pageSize:10,
  hasMore:true,

  data: {
    region:["北京","北京"],
    showFlag:true,
    dayArray:["4天","5天","5天(大小周)","6天"],
    day:"5天",
    dailyArray:["无","日报","日报+周报","周报","周报+月报","新人日报或周报","日周月报"],
    daily:"无",
    ontimeArray:["7:00","8:00","9:00","10:00","11:00","10:30","7:30","8:30","9:30","10:30"],
    ontime:"10:00",
    offtimeArray:["18:00","19:00","20:00","21:00","21:30","22:00","23:00"],
    offtime:"18:00",
    siestaArray:["1小时","1.5小时","2小时","2.5小时","3小时"],
    siesta:"1.5小时",
    specialArray:["无","每周下午茶","周五早下班","加班有补贴","经常团建","双周活动日","周三活动日+周五早走"],
    special:"无",

    workArray:[],
    sRegion:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket:true,
      menus:['shareAppMessage','shareTimeline']
    })
    this.queryPages()
  },

  queryPages:function(){
    if(!this.hasMore){
      return
    }
    wx.showLoading({
      title: '数据加载中',
    })
    let query = db.collection("work")
    if(this.data.sCity){
      //console.log("city = " + this.data.sCity)
      query = query.where({
        city:this.data.sCity
      })
    }
    if(this.data.sCompany){
      //console.log("sCompany = " + this.data.sCompany)
      query = query.where({
        company:{
          $regex:'.*'+this.data.sCompany+'.*',
          $options:'1'
        }
      })
    }
    query = query.orderBy('time','desc').skip((this.pageNum-1)*this.pageSize).limit(this.pageSize)
    query.get({
      success:res => {
        //console.log(res.data)
        this.hasMore=(res.data.length==this.pageSize)?true:false
        this.pageNum=this.pageNum+1
        let workArray = this.data.workArray
        //console.log("workArray = " + workArray)
        workArray = workArray.concat(res.data)
        this.setData({
          workArray:workArray
        })
      },
      complete:res=>{
        wx.hideLoading()
      }
    })
  },

  onReachBottom: function(){
    if(this.data.showFlag){
      this.queryPages();
    }
  },

  submitWork:function(e){
    let workObj = e.detail.value
    if(util.isEmpty(workObj.company)){
      wx.showToast({
        title: '公司名不能为空',
      })
      return
    }
    if(util.isEmpty(workObj.job)){
      wx.showToast({
        title: '岗位不能为空',
      })
      return
    }
    wx.showLoading({
      title:"数据保存中",
      mask:true
    })
    let data = this.data
    workObj.province = data.region[0]
    workObj.city = data.region[1]
    workObj.day = data.day
    workObj.daily = data.daily
    workObj.ontime = data.ontime
    workObj.offtime = data.offtime
    workObj.siesta = data.siesta
    workObj.special = data.special

    wx.cloud.callFunction({
      name:"quickstartFunctions",
      data:{
        "type":"createWork",
        "workObj":workObj
      },
      success:res=>{
        if(res.result){
          wx.showToast({
            title: '保存成功',
          })
          this.data.workArray.unshift(workObj)
          this.setData({
            showFlag:true,
            workArray:this.data.workArray
          })

        }else{
          wx.showToast({
            title: '保存失败',
          })
        }
      },
      fail:res=>{
        wx.showToast({
          title: '保存失败',
        })
      },
      complete:res=>{
        wx.hideLoading()
      }
    })
  },

  submitSearch:function(e){
    let sCompany = e.detail.value.sCompany
    this.doSearch(sCompany)
  },

  doSearch: function(sCompany){
    let sProvince = ""
    let sCity = ""
    if(this.data.sRegion){
      sProvince = this.data.sRegion[0]
      sCity = this.data.sRegion[1]
    }
    if(sCity=='-'){
      sCity=""
    }
    this.setData({
      sCompany:sCompany.trim(),
      sProvince:sProvince,
      sCity:sCity,
      workArray:[]
    })
    //搜索时重置
    this.hasMore=true
    this.pageNum=1
    this.queryPages()
  },

  searchRegion:function(e){
    if(e.detail.value[0] == '-' || e.detail.value[1] == ''){
      e.detail.value=[]
    }
    this.setData({
      sRegion:e.detail.value
    })
  },

  changeRegion:function(e){
    this.setData({
      region:e.detail.value
    })
  },

  changeDay:function(e){
    this.setData({
      day: this.data.dayArray[e.detail.value]
    })
  },
  changeDaily:function(e){
    this.setData({
      daily: this.data.dailyArray[e.detail.value]
    })
  },

  changeOntime:function(e){
    this.setData({
      ontime: this.data.ontimeArray[e.detail.value]
    })
  },

  changeOfftime:function(e){
    this.setData({
      offtime: this.data.offtimeArray[e.detail.value]
    })
  },

  changeSiesta:function(e){
    this.setData({
      siesta: this.data.siestaArray[e.detail.value]
    })
  },

  changeSpecial:function(e){
    this.setData({
      special: this.data.specialArray[e.detail.value]
    })
  },

  //显示
  showFlag: function(){
    this.setData({
      showFlag:!this.data.showFlag
    })
  },

  //查询
  showPc: function(){
    this.setData({
      showPc:!this.data.showPc
    })
  },

  onPullDownRefresh: function () {
    let sCompany = this.data.sCompany
    if(!sCompany){
      sCompany = ""
    }
    this.doSearch(sCompany)
  },

  cancel: function(){
    this.setData({
      showModal:false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
    return{
      title:"BATJ等大厂作息时间表",
      imageUrl:"../../images/share.png",
      path: "/pages/index/index"
    }

  }

})


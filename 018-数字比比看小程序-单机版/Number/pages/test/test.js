const util = require("../../utils/util.js");

Page({
  
  data: {
    category:[
      {image:"soft.png",name:"项目源码",id:1},
      {image:"test.png",name:"面试题库",id:2},
      {image:"download.png",name:"软件下载",id:3},
      {image:"java.png",name:"Java编程",id:4},
      {image:"html.png",name:"前端",id:5},
      {image:"python.png",name:"Python",id:6},
      {image:"xcx.png",name:"小程序",id:7},
      {image:"mianshi.png",name:"面试技巧",id:8},
      {image:"qita.png",name:"其他",id:9}
    ],

    banners:[
      {
        img:"https://jeeweixin.com/json/tt/imgs/1.jpg",
        link:"https://jeeweixin.com/wiki/1469644269420576/1485938265948256"
      },
      {
        img:"https://jeeweixin.com/json/tt/imgs/2.jpg",
        link:"https://jeeweixin.com/wiki/1469644269420576/1485938265948256"
      },
      {
        img:"https://jeeweixin.com/json/tt/imgs/3.jpg",
        url:"https://jeeweixin.com/wiki/1469644269420576/1485938265948256"
      }
    ],

    promps:[],
    curIndex:0
  },
  
  onLoad: function(e){

  },

  //模拟面试
  exam: function(e){
    wx.showToast({
      title: '功能开发中...',
    })
  },

  //帮助（加群交流）
  help: function(e){
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },

  //菜单导航
  navigator :function(e){
    let id = e.currentTarget.dataset.id;
    console.log("id = " + id);
    let url = null
    if(id == 1){
      url = "/pages/resource/resource"
    }else if(id == 2){
      url = "/pages/download/download"
    }else if(id == 3){
      url = "/pages/webview/webview?url=https://jeeweixin.com/wiki/1413501396451360/1422623229608000"
    }else if(id == 99){
      wx.showToast({
        title: '功能开发中...',
      })
    }
    if(url){
      wx.navigateTo({
        url: url,
      })
    }
  },

  //检索
  doSearch:function(e){
    let key = e.detail.value.key
    if(util.isEmpty(key)){
        wx.showToast({
          title: '请输入关键字',
        })
    }else{
        wx.navigateTo({
            url: '/pages/search/search?key='+key,
        })
    }
  }
  
});


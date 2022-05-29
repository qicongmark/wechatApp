/**
 * 技术交流QQ群：325025375
 * 源码使用方法，公众号：祁大聪
 *  */ 

// const app = getApp()
const { envList } = require('../../envList.js');
const CloudRequest = require('../../util/CloudRquest.js')
const db = wx.cloud.database()

Page({
  data: {
    
    blogs:[]

  },

  onLoad: function(e){
    
    //加载云数据库中的数据
    db.collection("blogs").orderBy("time","desc").get({
      success:res=>{
        //console.log(res)
        
        // let blog = res.data[0]
        // blog.brief = blog.brief.replace(/\\n/g, "\n") 
        
        this.setData({
          blogs:res.data
        })
      }
    })
    
  },

  //删除博客
  removeBlog:function(e){
    let id = e.currentTarget.dataset.id
    
    wx.cloud.callFunction({
      name:"blogFunctions",
      data:{
        type:"removeBlog",
        id:id
      },
      success:res=>{
        console.log(res);
        wx.showToast({
          title: '删除成功',
        })
        let blogs = this.data.blogs
        for(let i in blogs){
          if(blogs[i]._id == id){
            blogs.splice(i,1)
            break;
          }
        }
        this.setData({
          blogs:blogs
        })
      }
    })
  },
  
  changePromp: function(e){
    let index = 0
    index = e.currentTarget.dataset.index
    this.setData({
      curPromp:this.data.promps[index],
      curIndex:index
    })
  }

});

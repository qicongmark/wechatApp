/**
 * 技术交流QQ群：325025375
 * 源码使用方法，公众号：祁大聪
 *  */ 

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      avatar:"../../images/icon/20.png",
      name:""
    }
  },

  //授权获取用户信息
  onGetUserProfile:function(e){
    wx.getUserProfile({
      desc: '请授权头像和昵称的信息',
      success:res=>{
        //console.log(res);
        let userInfo = this.data.userInfo
        userInfo.avatar = res.userInfo.avatarUrl
        userInfo.name = res.userInfo.nickName
        this.setData({
          userInfo:userInfo
        })
      }
    })
  },

  //form表单提交
  submitBlog:function(e){

    let blog = e.detail.value
    
    //先做一些校验，再发起提交
    //todo

    wx.showLoading({
      title:"数据加载中..."
    })

    //获取富文本编辑器里的内容
    this.editorContext.getContents({
      success:res=>{
        //console.log(res)
        blog.content = res.html //+"<h2>我是标题</h2>"
        
        //上传图片
        if(this.data.blogImg){
          let blogImg = this.data.blogImg
          let filename = blogImg.substring(blogImg.lastIndexOf("."))
          filename = new Date().getTime() + filename
          wx.cloud.uploadFile({
            cloudPath:filename,
            filePath:this.data.blogImg,
            success:res=>{
              //console.log(res.fileID);
              blog.img = res.fileID
              //创建到云数据库
              this.createCloudBlog(blog)
            },
            fail:console.error
          })
        }else{
          //创建到云数据库
          this.createCloudBlog(blog)
        }

        // this.setData({
        //   blog:blog
        // })
      }
    })
  },

  //创建博客到云数据库
  createCloudBlog: function(blog){
    blog.time = new Date().getTime()
    //添加博客到云平台数据库中
    
    db.collection("blogs").add({
      data:blog,
      success:res=>{
        console.log(res._id)
      },
      complete:res=>{
        wx.hideLoading()//不严谨
        wx.showToast({
          title: '添加成功',
        })
      }
    }) 

    /**
    //云函数添加
    wx.cloud.callFunction({
      name:"blogFunctions",
      data:{
        type:"addBlog",
        blog:blog
      },
      success:res=>{
        wx.showToast({
          title: '添加成功',
        })
        console.log(res);
      },
      complete:res=>{
        wx.hideLoading()//不严谨
      }
    })*/

  },

  //富文本编辑器准备好了
  onEditorReady:function(e){
    wx.createSelectorQuery().select("#contentEditor").context(res=>{
      this.editorContext = res.context
    }).exec()
  },

  //富文本处理
  format: function(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    this.editorContext.format(name, value)
  },

  //选择本地图片
  chooseBlogImage:function(e){
    wx.chooseImage({
      count: 1,
      sourceType: ['album','camera'],
      success:res=>{
        this.setData({
          blogImg:res.tempFilePaths[0]
        })
      }
    })
  },

  //移除图片
  removeBlogImage:function(e){
    this.setData({
      blogImg:null
    })
  },

  //测试云函数的调用
  testBlogFunctions:function(e){
    wx.cloud.callFunction({
      name:"blogFunctions",
      data:{
        type:"addBlog"
      },
      success:res=>{
        console.log(res);
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
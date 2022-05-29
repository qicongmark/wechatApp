// index.js
/**
 * 技术交流群：325025375
 * 我的公众号：祁大聪
 */
const app = getApp()

Page({
  data: {

  },

  //提交数据
  submitBlog:function(e){
    //获取富文本编辑器里的内容
    this.editorContext.getContents({
      success:res=>{
        console.log(res)//有html和纯文本
        
        this.setData({
          blogContent:res.html
        })
      }
    })
  },

  //富文本编辑器初始化
  onEditorReady: function (e) {
    wx.createSelectorQuery().select("#contentEditor").context(res => {
      this.editorContext = res.context
    }).exec()
  },

  //富文本处理
  format: function (e) {
    let {
      name,
      value
    } = e.target.dataset
    if (!name) return
    this.editorContext.format(name, value)
  },

  //插入图片
  insertImage: function (e) {
    wx.chooseImage({
      count: 1,
      success: res=> {
        this.editorContext.insertImage({
          src: res.tempFilePaths[0], //可以换成云函数的 fileid
          data: {
            id: 'myImg'
          },
          width: '80%',
          success: function () {
            console.log('insert image success')
          }
        })
      }
    })
  }
})

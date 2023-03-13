
## 如何自定义 NavigationBar ?（以搜索为例）

1、拷贝 components/navbar (images) 到你的项目中

2、在app.js中拷贝方法，prepareNavigationBar 并调用；

3、在需要自定义的页面中，修改json

  "navigationStyle": "custom",
  "usingComponents": {
    "navbar": "/components/navbar/navbar"
  }

4、在wxml文件中使用navbar
  showBack：是否显示回退按钮
  title：标题（placeholder）

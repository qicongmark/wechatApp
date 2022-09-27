Page({
  data: {
    id: '',
    threeD: true
  },

  onLoad: function (options) {
    let movies = [{
      "id": 1,
      "name": "国庆看大头",
      "2d": true,
      "img": "../../images/m1.png",
      "score": 9.0,
      "stars": "董浩",
      "desc": '今天126家影院放映1216场'
    },
    {
      "id": 2,
      "name": "我是霸王龙",
      "3d": true,
      "img": "../../images/m2.png",
      "score": 9.9,
      "stars": "霸王龙",
      "desc": '今天176家影院放映1216场'
    },
    {
      "id": 3,
      "name": "夏洛特烦恼",
      "2d": true,
      "3d": true,
      "img": "../../images/m3.png",
      "score": 9.3,
      "stars": "沈腾，马丽，尹正",
      "desc": '今天86家影院放映216场'
    }]

    movies = movies.concat(movies).concat(movies)
    this.setData({
      movies: movies
    })
  },

  detail: function (res) {
    var id = res.currentTarget.id;
    wx.navigateTo({
      url: '../moviedetail/moviedetail?id=' + id
    })
  }

})
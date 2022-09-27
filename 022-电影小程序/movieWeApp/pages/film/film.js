//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        films: [

        ],

        // 控制分页（展示数量）
        offset: 0,
        limit: 10,

        scrollHeight: 0,

        loading: true,
        userInfo: {}
    },

    onLoad: function () {
        console.log('onLoad')
        const that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
            //更新数据
            that.setData({
                userInfo:userInfo
            })
        });

        wx.getSystemInfo({
            success(res){
                that.setData({
                    scrollHeight: res.windowHeight
                })
                console.log(res.windowHeight)
            }
        })

        this.loadFilms();
    },

    // 滑动到底部，加载更多
    lower(e){
        this.setData({
            loading: true
        })
        this.loadFilms()
    },

    //滑动到头部
    bindscrolltoupper(e){
        console.log(e)
    },
    
    //加载电影
    loadFilms(){
        const that = this;
        wx.request({
            url: 'https://m.maoyan.com/movie/list.json',
            data:{
                type: "movies",
                offset: this.data.offset,
                limit: 10
            },
            method: "GET",
            header: {
                'content-type': 'application/json'
            },
            success(res){
                let films = that.data.films;
                films = films.concat( res.data.data.movies );

                that.setData({
                    films: films,
                    offset: that.data.offset + 10,
                    loading: false,
                });
                console.log(that.data.films);
            }
        })
    },

    bindDetail(e){
        const id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: 'detail/detail?id=' + id
        })
    }

})

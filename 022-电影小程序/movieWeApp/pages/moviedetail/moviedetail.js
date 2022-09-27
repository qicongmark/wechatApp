Page({
    data: {
        id: '',
        imgsrc: '',
        name: '',
        score: '',
        comment: '',
        cat: '',
        country: '',
        showing: '',
        duration: '',
        desc: '',
        localover: '../assets/images/icon_d_arrow_down.png',
        hideText: true,
        hideClass: 'up',
        comments: [],
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        var that = this;
        
        var id = options.id;
        // console.log(id);
        var url = 'http://m.maoyan.com/movie/' + id + '.json';
        wx.request({
            url: url,
            data: {},
            method: 'GET',
            header: 'Content-type: application/json',
            success: function (res) {
                /**
                 * 获取电影基本信息
                 */
                var value = res.data.data.MovieDetailModel;
                that.setData({
                    imgsrc: value.img, name: value.nm, score: value.sc, comment: value.snum,
                    cat: value.cat, country: value.src, showing: value.rt, duration: value.dur
                });
                var text = value.dra;
                var subtext = text.substring(3, text.length - 4);
                that.setData({ desc: subtext });
                /**
                 * 获取评论
                 */
                that.setData({
                    comments: res.data.data.CommentResponseModel.hcmts
                })
            }
        })
    },
    showall: function () {
        var that = this;
        var hide = that.data.hideText;
        var hideClass = that.data.hideClass == 'up' ? 'down' : 'up';
        that.setData({
            hideText: !hide,
            hideClass: hideClass
        })
    }
})
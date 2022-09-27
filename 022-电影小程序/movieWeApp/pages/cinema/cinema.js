Page({
    data: {
        infos1: [],
        infos2: [],
        infos3: [],
        infos4: [],
        infos5: [],
        infos6: []
        // area: ['宝安区', '龙岗区', '南山区', '福田区', '罗湖区', '盐田区']
    },
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: 'http://m.maoyan.com/cinemas.json',
            data: {},
            method: 'GET',
            success: function (res) {
                // var nanshan = area.this.data.area[0];
                var area = res.data.data;
                that.setData({
                    infos1: area.宝安区,
                    infos2: area.龙岗区,
                    infos3: area.南山区,
                    infos4: area.福田区,
                    infos5: area.罗湖区,
                    infos6: area.盐田区
                })
                // var one = area.baoan;
                // console.log(area.宝安区);
                // for (var i = 0; i < that.data.area; i++) {

                // }

            }
        })
    }
})
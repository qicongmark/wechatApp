//index.js

var app = getApp();

Page({
  data: {
  },

  //准备圆点数据
  prepareCircle: function(){
    //圆点设置
    var left = 15;
    var top = 8;
    var circleList = [];
    for (var i = 0; i < 20; i++) {
      if (i < 6) {
        left = 15 + 120 * i;
        top = 10;
        circleList.push({ top: top, left: left });
      } else if (i >= 6 && i < 11) {
        left = 620;
        top = 10 + 115 * (i - 5);
        circleList.push({ top: top, left: left });
      } else if (i >= 11 && i < 16) {
        left = 20 + 120 * (i - 11);
        top = 590;
        circleList.push({ top: top, left: left });
      } else {
        left = 10;
        top = 10 + 120 * (i - 15);
        circleList.push({ top: top, left: left });
      }
    }

    //圆点闪烁
    setInterval(function () {
      if (this.data.colorRed == '#FFDF2F') {
        this.setData({
          colorRed: '#FE4D32',
          colorYellow: '#FFDF2F',
        });
      } else {
        this.setData({
          colorRed: '#FFDF2F',
          colorYellow: '#FE4D32',
        });
      }
    }.bind(this), 500);

    this.setData({
      circleList: circleList
    });
  },

  //准备奖品
  prepareAwards: function(){
    //奖品item设置
    var awardList = [
      { name: "1元", cls: "award-item", atype: 0 },
      { name: "2元", cls: "award-item", atype: 0 },
      { name: "3元", cls: "award-item", atype: 0 },
      { name: "4元", cls: "award-item", atype: 0 },
      { name: "开始", cls: "start-btn", atype: 1 },
      { name: "5元", cls: "award-item", atype: 0 },
      { name: "6元", cls: "award-item", atype: 0 },
      { name: "7元", cls: "award-item", atype: 0 },
      { name: "8元", cls: "award-item", atype: 0 }
    ];
    var awardIndexs = [0, 1, 2, 5, 8, 7, 6, 3];//奖品index
    
    this.setData({
      awardList: awardList,
      awardIndexs: awardIndexs
    });
  },
  
  onLoad: function () {
    this.prepareCircle();
    this.prepareAwards();
  },

  //开始抽奖
  startGame: function () {
    this.resetawardList();//重置数据

    var num = Math.floor(Math.random() * 20 + 10) //中奖
    var i = (num - 35) + Math.floor(Math.random()*7)
    //console.log("num = ", num ," ; i = " + i);
    
    var awardIndexs = this.data.awardIndexs;//奖品的index
    var awardList = this.data.awardList;
    this.timer = setInterval(function () {
      var t = -1;
      for (var j = 0; j < awardIndexs.length; j++) {
        var sitem = awardList[awardIndexs[j]];
        if (sitem.cls == 'award-item award-cur') {
          sitem.cls = 'award-item';
          t = j;
          break;
        }
      }

      if (t == -1 || t == 7) t = 0;
      t += 1;
      awardList[awardIndexs[t]].cls = 'award-item award-cur';

      i++;
      if (i === num) {
        clearInterval(this.timer);//清除计时器
        wx.showModal({
          title: '恭喜',
          content: '获得' + (awardList[awardIndexs[t]].name),
          showCancel: false
        });
      }

      this.setData({
        awardList: awardList
      });

    }.bind(this), 130);

  },

  //重置数据
  resetawardList: function () {
    var awardIndexs = this.data.awardIndexs;
    var awardList = this.data.awardList;
    for (var j = 0; j < awardIndexs.length; j++) {
      awardList[awardIndexs[j]].cls = 'award-item';
    }
  }

})

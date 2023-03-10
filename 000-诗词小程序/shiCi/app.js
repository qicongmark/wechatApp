// app.js
App({
  onLaunch() {
    
  },
  globalData: {
    name:"祁聪",
    userInfo: null
  },
  poems:{
    tangShiArray:[
      {id:"1",authorCode:"libai",author:"李白",title:"静夜思",verses:["床前明月光","疑是地上霜","举头望明月","低头思故乡"],img:"/images/s4.png",desc:"静夜思：宁静的夜晚所引起的乡思。疑：怀疑，以为。举：抬、仰。明月光：明亮的月光。举头：抬头。望明月：一作“望山月”。晋《清商曲辞·子夜四时歌·秋歌》：“仰头看明月，寄情千里光。”低头：形容沉思的神态。思：思念。"},
      {id:"2",authorCode:"libai",author:"李白",title:"黄鹤楼送孟浩然之广陵",verses:["故人西辞黄鹤楼","烟花三月下扬州","孤帆远影碧空尽","唯见长江天际流"]},
      {id:"3",authorCode:"libai",author:"李白",title:"望庐山瀑布",verses:["日照香炉生紫烟","遥看瀑布挂前川","飞流直下三千尺","疑是银河落九天"]},
      {id:"4",authorCode:"dufu",author:"杜甫",title:"春夜喜雨",verses:["好雨知时节","当春乃发生","随风潜入夜","润物细无声"]},
      {id:"5",authorCode:"dufu",author:"杜甫",title:"绝句",verses:["两个黄鹂鸣翠柳","一行白鹭上青天","窗含西岭千秋雪","门泊东吴万里船"]},
      {id:"6",authorCode:"baijuyi",author:"白居易",title:"赋得古原草送别",verses:["离离原上草","一岁一枯荣","野火烧不尽","春风吹又生"]},
      {id:"7",authorCode:"wangwei",author:"白居易",title:"相思",verses:["红豆生南国","春来发几枝","愿君多采撷","此物最相思"]},
      {id:"8",authorCode:"dumu",author:"杜牧",title:"清明",verses:["清明时节雨纷纷","路上行人欲断魂","借问酒家何处有","牧童遥指杏花村"]},
      {id:"9",authorCode:"lishangyin",author:"李商隐",title:"无题·相见时难别亦难",verses:["相见时难别亦难","东风无力百花残","春蚕到死丝方尽","蜡炬成灰泪始干"]}
    ],
    songCiArray:[
      {id:"1",authorCode:"sushi",author:"苏轼",title:"水调歌头·明月几时有",verses:["明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间","转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。"],img:"/images/s4.png"},
      {id:"2",authorCode:"sushi",author:"苏轼",title:"念奴娇·赤壁怀古",verses:["大江东去，浪淘尽，千古风流人物","故垒西边，人道是，三国周郎赤壁。","乱石穿空，惊涛拍岸，卷起千堆雪。","江山如画，一时多少豪杰。"]},
      {id:"3",authorCode:"liqingzhao",author:"李清照",title:"声声慢·寻寻觅觅",verses:["寻寻觅觅，冷冷清清，凄凄惨惨戚戚。乍暖还寒时候，最难将息。三杯两盏淡酒，怎敌他、晚来风急！雁过也，正伤心，却是旧时相识。","满地黄花堆积，憔悴损，如今有谁堪摘？守着窗儿，独自怎生得黑！梧桐更兼细雨，到黄昏、点点滴滴。这次第，怎一个愁字了得！"], img:"/images/s5.png"},
      {id:"4",authorCode:"liqingzhao",author:"李清照",title:"一剪梅·红藕香残玉簟秋",verses:["红藕香残玉簟秋。轻解罗裳，独上兰舟。云中谁寄锦书来？雁字回时，月满西楼","花自飘零水自流。一种相思，两处闲愁。此情无计可消除，才下眉头，却上心头"]},
      {id:"5",authorCode:"xinqiji",author:"辛弃疾",title:"青玉案·元夕",verses:["东风夜放花千树，更吹落、星如雨。宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。","蛾儿雪柳黄金缕，笑语盈盈暗香去。众里寻他千百度，蓦然回首，那人却在，灯火阑珊处。"], img:"/images/s6.png"},
      {id:"6",authorCode:"xinqiji",author:"辛弃疾",title:"破阵子·为陈同甫赋壮词以寄之",verses:["醉里挑灯看剑，梦回吹角连营。八百里分麾下炙，五十弦翻塞外声，沙场秋点兵。","马作的卢飞快，弓如霹雳弦惊。了却君王天下事，赢得生前身后名。可怜白发生！"]}
    ],
    yuanQuArray:[
      {id:"1",avatar:"/images/h1.png",authorCode:"mazhiyuan",author:"马致远",title:"天净沙·秋思",verses:["枯藤老树昏鸦，小桥流水人家。古道西风瘦马，夕阳西下，断肠人在天涯。"]},
      {id:"2",avatar:"/images/h2.png",authorCode:"guanhanqing",author:"关汉卿",title:"一枝花",verses:["攀出墙朵朵花，折临路枝枝柳。"]},
      {id:"3",avatar:"/images/h3.png",authorCode:"zhengguangzu",author:"郑光祖",title:"蟾宫曲·梦中作",verses:["半窗幽梦微茫，歌罢钱塘，赋罢高唐。"]},
      {id:"4",avatar:"/images/h4.png",authorCode:"baipu",author:"白朴",title:"天净沙·春",verses:["忘忧草，含笑花，劝君闻早冠宜挂。"]}
    ]
  }
})

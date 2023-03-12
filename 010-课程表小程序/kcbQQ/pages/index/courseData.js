/**
 * 每一个数组代表一天
 * count：课程节数
 * siesta：是否休息
 * 注：课程数据要和 index.js 中的times对应
 * */
var courseList = [
    //周日 16进制的颜色
    [{count:2, name:"计算机（单）",room:"1号楼888", bgcolor:"#A9A9A9"},
     {count:1},
     {count:1},
     {count:1, siesta: 1},
     {count:2, name:"语文", room:"1号楼808", bgcolor:"#FFB6C1"},
     {count:1},
     {count:1},
     {count:1}
    ],

    //周一
    [{count:2, name:"数学", room:"多媒体3102", bgcolor:"#AFEEEE"},
     {count:2, name:"英语", room:"多媒体3102", bgcolor:"#98FB98"},
     {count:1, siesta: 1},
     {count:1},
     {count:1},
     {count:1, name:"体育", room:"第2操场", bgcolor:"#E6E6FA"},
     {count:1},
     {count:1}
    ],

    //周二
    [{count:1},
     {count:1},
     {count:2, name:"计算机", room:"多媒体3102", bgcolor:"#A9A9A9"},
     {count:1, siesta: 1},
     {count:1},
     {count:1},
     {count:1},
     {count:1},
     {count:1}
    ],

    //周三
    [{count:2, name:"Java编程", room:"多媒体3102", bgcolor:"#FA8072"},
     {count:1},
     {count:1},
     {count:1, siesta: 1},
     {count:2, name:"数据库", room:"多媒体3102", bgcolor:"#7D9ECD"},
     {count:1},
     {count:1},
     {count:1}
    ],

    //周四
    [{count:1, name:"化学", bgcolor:"#FADFA0", room:"多媒体3102"},
     {count:1},
     {count:1, name:"物理", bgcolor:"#7D9ECD", room:"多媒体3102"},
     {count:1},
     {count:1, siesta: 1},
     {count:1, name:"地理", bgcolor:"#AFEEEE"},
     {count:1},
     {count:2, name:"语文", bgcolor:"#FFB6C1", room:"多媒体3102"},
     {count:1}
    ],
    
    //周五
    [{count:1, name:"数学", bgcolor:"#AFEEEE", room:"多媒体3102"},
     {count:3, name:"计算机", bgcolor:"#A9A9A9", room:"多媒体3102"},
     {count:1, siesta: 1},
     {count:1},
     {count:1},
     {count:1},
     {count:1},
     {count:1}
    ],

    //周六
    [{count:1},
     {count:1, name:"化学", bgcolor:"#98FB98", room:"多媒体3102"},
     {count:1},
     {count:1},
     {count:1, siesta: 1},
     {count:2, name:"C编程", bgcolor:"#FA8072", room:"多媒体3102"},
     {count:1},
     {count:1},
     {count:1}
    ],

]

module.exports = {
    courseList: courseList
}


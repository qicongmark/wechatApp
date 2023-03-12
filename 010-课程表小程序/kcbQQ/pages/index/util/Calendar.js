
function generateWeekList() {
    let result = [];
    let textArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

    let now = new Date(); //当前日期
    let timestamp = Date.parse(now);
    let nowDay = now.getDay(); //周几
    let nowDate = now.getDate(); //当前日期

    // 循环选中周的周一到周日
    for (var i = 0; i < 7; i++) {

        // 选中周的周几（值就是i）和今天对应的本周周几差多少天
        let offset = i - nowDay;
        let tmpTimestamp = timestamp + offset * 24 * 60 * 60 * 1000;
        let tmpDate = new Date(tmpTimestamp);
        let date = tmpDate.getDate();
        let time = (tmpDate.getMonth() + 1) + "-" + date; //日期

        //是否今天
        let curWeekDay = (nowDate == date);
        //console.log("curWeekDay = " + curWeekDay)

        result.push({
            text: textArr[i],
            time: time,
            curDay: curWeekDay
        });

    }
    return result;
}

module.exports = {
    generateWeekList: generateWeekList
}
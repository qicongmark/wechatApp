const getWeRunData = require('./getWeRunData/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getWeRunData':
      return await getWeRunData.main(event, context)
  }
}

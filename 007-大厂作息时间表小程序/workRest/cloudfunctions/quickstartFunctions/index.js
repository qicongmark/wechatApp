const createWork = require('./createWork/index');
const queryUserWork = require('./queryUserWork/index');

// 云函数入口函数
exports.main = async (event, context) => {
  
  switch (event.type) {
    case "createWork":
      return await createWork.main(event,context)
    case "queryUserWork":
      return await queryUserWork.main(event,context)
  }
  
};

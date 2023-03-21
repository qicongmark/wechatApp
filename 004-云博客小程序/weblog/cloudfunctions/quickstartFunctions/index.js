const getOpenId = require('./getOpenId/index');
const addBlog = require('./addBlog/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getOpenId':
      return await getOpenId.main(event, context);
    case 'addBlog':
      return await addBlog.main(event, context);
      
  }
};

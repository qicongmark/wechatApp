const addBlog = require('./addBlog/index');
const removeBlog = require('./removeBlog/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'addBlog':
      return await addBlog.main(event, context);
    case 'removeBlog':
      return await removeBlog.main(event, context);
       
  }
};
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});



Post.hasMany(Comments, {
    foreignKey: 'post_id',
});



Comments.belongsTo(User, {
    foreignKey: 'user_id',
});


// Comment.belongsTo(Post, {
//     foreignKey: 'post_id',
//     onDelete: 'CASCADE'
// })



module.exports = { User, Post, Comment };
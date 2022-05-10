const User = require('./user');
const Post = require('./post');
const Comments = require('./comments');

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Comments.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Post.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})

// Comments.belongsTo(Post, {
//     foreignKey: 'post_id',
//     onDelete: 'CASCADE'
// })



module.exports = { User, Post, Comments };
const sequelize = require('../config/connection')
const { User, Post, Comment } = require('../models')

const commentData=require('./comment.json')
const userData= require('./user.json')
const postData= require('./post.json')

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true })
await User.bulkCreate(userData , {
    individualHooks: true,
    returning: true,
})
await Post.bulkCreate(postData)
await Comment.bulkCreate(commentData)
} catch (err) {
console.log(err);
}
};

seedDatabase()
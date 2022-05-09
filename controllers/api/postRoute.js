const router = require('express').Router()
const { User, Post, Comment } = require('../../models')

router.get('/', async (req, res) => {
    console.log(req.body.post_id);
    try {
        res.render('post')
    } catch (err) {
        res.json(err)
    }
})

module.exports = router;
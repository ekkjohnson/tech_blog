const router = require('express').Router()
const { User, Post, Comment } = require('../../models')
const withAuth = require('../../utils/auth')

// router.get('/', async (req, res) => {
//     console.log(req.body.post_id);
//     try {
//         res.render('post')
//     } catch (err) {
//         res.json(err)
//     }
// })
router.get("/:id", withAuth, async (req, res) => {
    const postData = await Post.findAll({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
  
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    const comments = commentData.map((comment) => comment.get({ plain: true }));
  
    try {
      res.render("post", {
        posts,
        comments,
      });
    } catch (err) {
      res.json(err);
    }
  });
  
  router.post("/:id", withAuth, async (req, res) => {
    const newComment = await Comment.create({
      comment: req.body.comment,
      post_id: req.params.id,
      user_id: req.session.user_id,
    });
    console.log(newComment);
    try {
      res.json(newComment);
    } catch (err) {
      res.json(err);
    }
  });
  
module.exports = router;
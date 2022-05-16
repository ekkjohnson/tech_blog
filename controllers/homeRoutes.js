const router = require("express").Router();
const { User, Post, Comment} = require("../models");

// router.get("/", async (req, res) => {
//   const postData = await Post.findAll({
//     include: [
//       {
//         model: User,
//         attributes: ["id", "username"],
//       },
//       {
//         model: Comment,
//         attributes: ["comment", "user_id", "created"],
//       },
//     ],
//   });
//   const posts = postData.map((post) => post.get({ plain: true }));

//   try {
//     res.render("home", {
//       posts,
//     });
//   } catch (err) {
//     res.json(err);
//   }
// });

router.get('/', async (req, res)=> {
  try{

      const postData = await Post.findAll()
          const posts = postData.map((post) => post.get({ plain: true }));
          res.render('home', { posts, logged_in: req.session.logged_in, user_id: req.session.user_id
           });

  }catch (err) {
      res.status(500).json(err);
  }
});
//view single posts by their id
router.get('/:id', async (req, res) => {
  try {
      const post = await Post.findByPk(req.params.id, {
          include: [
              {
              model: Comments,
              include: [
                  {
                      model: User,
                  }
              ]
          }
      ]
      });
      const singlePost = post.get({ plain: true });
      console.log(singlePost)
      res.render('singlePosts', { singlePost, logged_in: req.session.logged_in, user_id: req.session.user_id });
      } catch (err) {
          console.error(err);
          res.status(400).json(err);
  }
});
//add a comment to a single post
router.post('/:id', async (req, res) => {
  try {
      const message = await Comments.create({
          ...req.body,
          post_id: req.params.id,
          user_id: req.session.user_id
      });
      res.json({message})
  } catch (err) {
      res.status(500).json(err);
  }
})


module.exports = router;
const router = require('express').Router()
const { Post, User, Comment } = require('../../models')
// const withAuth = require("../../utils/auth");

// router.get("/", withAuth, async (req, res) => {
//     if(!req.session) {
//        console.log('you need to log in first');
//     }
//     const postData = await Post.findAll({
//         where: {
//             user_id: 1
//         },
//         include: [
//             {
//               model: User,
//               attributes: ["id", "username"],
//             },
//             {
//               model: Comment,
//               attributes: ["comment", "user_id", "created"],
//             },
//           ],
//         });
//     const posts = postData.map((post) => post.get({ plain: true }))

//     try {
        
//         res.render('dashboard', {
//             posts
//         })
//     } catch (err) {
//         res.json(err)
//     }
// })
// router.get("/add", withAuth, async (req, res) => {
//     res.render("addpost");
//   });
  
//   router.post("/add", withAuth, async (req, res) => {
//     try {
//       const newPost = await Post.create({
//         title: req.body.title,
//         content: req.body.content,
//         user_id: req.session.user_id,
//       });
//       res.json(newPost);
//     } catch (err) {
//       res.json(err);
//     }
//   });
router.get('/:user_id', async (req, res)=> {
  try{
      const userData = await User.findByPk(req.params.user_id, {
          include: [
              {
                  model: Post
              }
          ]
      })
      const posts = userData.get({ plain: true});
      console.log(posts)
      res.render('dashboard', { posts, logged_in: req.session.logged_in, user_id: req.session.user_id })

  }catch (err) {
      res.status(500).json(err);
  }
});

router.post('/:user_id', async (req, res) => {
  try {
      const message = await Post.create({
          ...req.body,
          user_id: req.params.user_id 
      });
      res.json({message})
  } catch (err) {
      res.status(500).json(err);
  }
});

router.put('/:user_id', async (req, res) => {
  try {
      const message = await Post.create({
          ...req.body,
          user_id: req.params.user_id 
      });
      res.json({message})
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router
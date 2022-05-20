const router = require('express').Router();
const {response} = require('express');
const { User } = require('../../models');

router.get('/signup', (req, res) => {
  res.render('signup')
})

// Sign up post route
router.post('/signup', async (req, res) => {
  
      // Find the user who matches with the username in the database
      // If there is no match with the username, send a incorrect message to the user and have them retry
     
        try {
            const createUser = await User.create({
                user_name: req.body.user_name,
                email: req.body.email,
                password: req.body.password

            });
              req.session.save(() => {
                req.session.user_id = createUser.id;
                console.log(req.session.user_id);
                req.session.logged_in = true;
                res.json(createUser);
              });
        } catch (err) {
            res.status(500).json(err)
        }
});

router.get("/login", async (req, res) => {
  console.log(req.session);
  try {
    res.render("login");
  } catch (err) {
    res.json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
        res.status(400).json({ message: 'Incorrect username or password, please try again' });
        return;
      }
      //verify password and check database
      const validPw = await user.checkPassword(req.body.password);
      //if password doesn't exist send error
      if (!validPw) {
        res.status(401).json({ message: 'Incorrect password, please try again' });
        return;
      }
      //session based on current user logged in
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        
        res.json({ user: user, message: 'You are logged in now'})
      });
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
      }
    });



router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
  res.redirect("/");
});

    module.exports = router;
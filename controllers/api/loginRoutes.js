const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    // Find the user who matches with the username in the database
    const user = await User.findOne({ where: {email: req.body.email}});
//if no match with user name send an error
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
        
        res.json({ user: user, message: 'You are logged in'})
      });
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
      }
    });
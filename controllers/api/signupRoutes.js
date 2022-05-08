const router = require('express').Router();
const { response } = require('express');
const { User } = require('../../models');

router.get('/', (req, res) => {
    res.render('signup')
})

router.post('/', async (req, res) => {
    try {
        const createUser = await User.create({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password

        });
        req.session.save(() => {
            req.session.user_id = createUser.id;
            req.session.logged_in = true;
            res.json(createUser);
          });

        emailer(req.body.email).catch(console.error);
        // res.json({ message: `User created` })
        // res.redirect('/');
        
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports=router;
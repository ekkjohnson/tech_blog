const auth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/home');
    } else {
        next();
      }
    };
    
    module.exports = auth;
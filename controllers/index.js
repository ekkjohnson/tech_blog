const router = require('express').Router()
const homeRoutes = require('./homeRoutes')
const apiRoutes = require('./api')

router.use('/', homeRoutes)
router.use('/api', apiRoutes)

// router.get('*', (req, res) => {
//     res.redirect('/home')
// })

module.exports = router;
const router = require('express').Router()
const homeRoutes = require('./homeRoutes')
const dashboardRoute = require('./dashboardRoute')
const apiRoutes = require('./api')

router.use('/home', homeRoutes)
// router.use('/dashboard', dashboardRoute)
router.use('/api', apiRoutes)

router.get('*', (req, res) => {
    res.redirect('/home')
})

module.exports = router;
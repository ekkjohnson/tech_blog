const router = require('express').Router()
const dashboardRoute = require('./dashboardRoute')
const postRoute = require('./postRoute')
const userRoute = require('./userRoute')

router.use('/dashboard', dashboardRoute)
router.use('/post', postRoute)
router.use('/user', userRoute)


module.exports = router;
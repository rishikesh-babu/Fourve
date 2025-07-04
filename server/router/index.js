const express = require('express')
const postRouter = require('./postRouter')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Routes: API')
    next()
})

router.use('/post', postRouter)

const apiRouter = router
module.exports = apiRouter
const express = require('express')
const { createPost } = require('../controller/postController')
const upload = require('../middleware/multer')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Routes: post')
    next()
})

router.post('/create', upload.array('images', 5), createPost)

const postRouter = router
module.exports = postRouter 
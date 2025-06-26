const express = require('express')
const { createPost, getAllPost } = require('../controller/postController')
const upload = require('../middleware/multer')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Routes: Post')
    next()
})

router.post('/create-post', upload.array('images'), createPost)
router.get('/get-all-post', getAllPost)

const postRouter = router
module.exports = postRouter 
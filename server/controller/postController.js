const cloudinaryInstance = require("../config/cloudinary")
const Media = require("../model/mediaModel")
const Post = require("../model/postModel")

async function createPost(req, res, next) {
    try {
        console.log('Routes: Create Post')

        // const { title, description } = req.body
        const files = req.files

        // if (!title || !description) {
        //     return res.status(400).json({ message: 'Title and description Required' })
        // }

        // if (!files) {
        //     return res.status(400).json({ message: 'Media required' })
        // }

        const post = new Post({})

        await post.save()

        const postId = post._id

        for (const file of files) {
            const result = (await cloudinaryInstance.uploader.upload(file.path, {
                folder: 'Fourve',
                public_id: `${file.filename}_${Date.now()}`,
                resource_type: 'auto',
            }))

            const media = new Media({
                url: result.secure_url,
                type: result.resource_type,
                postId,
            })

            await media.save()
        }

        res.status(200).json({ message: 'File uploaded' })
    } catch (err) {
        next(err)
    }
}

async function getAllPost(req, res, next) {
    try {
        console.log('Routes: Get all Post')

        const posts = await Post.find().sort({ createdAd: -1 })

        const result = []

        for (const post of posts) {
            const media = await Media.find({ postId: post._id })

            result.push({
                ...post.toObject(),
                media
            })
        }

        res.status(200).json({ message: 'Posts fetched', data: result })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createPost,
    getAllPost
}
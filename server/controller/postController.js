const cloudinaryInstance = require("../config/cloudinary")
const Media = require("../model/mediaModel")
const Post = require("../model/postModel")

async function createPost(req, res, next) {
    try {
        console.log('Routes: Create Post')

        const { title, description } = req.body
        const files = req.files

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description Required' })
        }

        if (!files) {
            return res.status(400).json({ message: 'Media required' })
        }

        const post = new Post({
            title,
            description,
        })

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

        res.status(200).json({ message: 'Post Created' })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createPost
}
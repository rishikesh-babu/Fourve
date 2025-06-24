const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema({
    url: {
        type: String, 
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true
    }, 
    type: {
        type: String, 
        enum: ['image', 'video'], 
        required: true,
    }, 
    createdAt: {
        type: Date, 
        default: Date.now
    }
})

const Media = mongoose.model('Media', mediaSchema)
module.exports = Media
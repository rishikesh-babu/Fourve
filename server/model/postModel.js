const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String, 
        // required: true, 
    },  
    description: {
        type: String,
        // required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post
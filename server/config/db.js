const mongoose = require('mongoose')

function connectDB() {
    mongoose.connect(process.env.MONGO_URI, {})
        .then((res) => {
            console.log('Connected to DB')
        })
        .catch((err) => {
            console.log('Error in db')
        })
}

module.exports = connectDB
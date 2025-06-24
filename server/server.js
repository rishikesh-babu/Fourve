const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const apiRouter = require('./router')
const port = 3000

dotenv.config()

const app = express()
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, (err) => {
    if (err) {
        console.log('Error in starting server')
        console.log('err :>> ', err);
    } else {
        console.log('Server is running at port:', port)
    }
})

app.use((req, res, next) => {
    console.log('\nreq.method :>> ', req.method);
    console.log('req.path :>> ', req.path);
    next()
})

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' })
})

// API 
app.use('/api', apiRouter);

// Internal error handling 
app.use((err, req, res, next) => {
    if (err) {
        console.log('err.message :>> ', err.message);
        return res.status(err.statusCode || 500).json({ message: err.message || 'Internal Server Error' })
    }
})

app.all(/.*/, (req, res) => {
    res.status(404).json({ message: 'End point does not exist' });
});

const express = require('express')
const cors = require('cors')
const port = 3000

const app = express()

app.listen(port, (err) => {
    if (err) {
        console.log('Error in starting server')
        console.log('err :>> ', err);
    } else {
        console.log('Server is running at port:', port)
    }
})
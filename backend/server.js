require('dotenv').config()

const express = require('express')
const readlineSync = require("readline-sync")
const cors = require('cors')

const googleaiRoute = require('./routes/ai')
const newsRoute = require('./routes/news')

//express app
const app = express()

//for logging requests
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })


// middleware
app.use(express.json())
app.use(cors())

//routes
app.use('/googleai', googleaiRoute)
app.use('/news', newsRoute)


//for nonexistent routes
app.use((req, res, next) => {
    res.status(404).send("Not Found")
  })
  
//for middleware errors
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something went wrong!")
})
  
// listen to port
app.listen(process.env.PORT, () => {
    console.log('listening for requests on port', process.env.PORT)
})
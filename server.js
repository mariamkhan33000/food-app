const express = require('express')
const app = express()
const colors = require('colors')
const cors = require('cors')
const morgon = require('morgan')
const dotenv = require('dotenv')
const connectDb = require('./config/db')
dotenv.config();
const PORT = process.env.PORT || 8000;

connectDb();


app.use(cors())
app.use(express.json())
app.use(morgon("dev"))

app.use('/api/v1/test', require('./routes/testRoutes'))

app.get('/', (req, res) => {
    res.send('hello world Mohsin Khan!')
})


app.listen(PORT, () => {
    console.log(`Server is runing at :  ${PORT}`.white. bgMagenta)
})



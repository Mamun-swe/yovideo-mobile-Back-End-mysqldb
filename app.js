const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'yoplayer'
})

connection.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('DB Connected')
    }
})

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


const authRoute = require('./api/routes/auth')
app.use('/api/auth', authRoute)



const port = process.env.PORT || 3000
app.get('/', (req, res) => {
    res.send('I am root route')
})

app.listen(port, () => {
    console.log(`Server running on ${port} port`)
})
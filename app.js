const express = require('express')
const bodyparser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const route = require('./routes/routes')
const oroute = require('./routes/orderRoutes')
const oute = require('./routes/resturantRoutes')
const froute = require('./routes/Food_Routes')
const db = require('./database/db')
const broute = require('./routes/bookingRoutes')


const cors = require('cors');
const app = express()
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.json())
app.use('/images', express.static(__dirname + '/images'));

// app.use(fileupload())
app.use(cors())


app.use(route)

app.use(broute);
app.use(froute);
app.use(oroute);
app.use(oute);






app.listen(3000)
const express = require('express');
require('dotenv').config();
const cors = require ('cors');
const connection = require('./config/dbconnction');
const authRouter = require('./routers/authrouter');
const detailsRouter = require('./routers/detailsrouter');
const newproductRouter = require("./routers/newproduct");
const paymentRouter = require("./routers/paymentrouter");
const app = express();



/**
 * Connection to DataBase:
 */

connection.connect();


/**
 * PORT
 */
const PORT = process.env.APP_PORT || 8080;


/**
 *  setttings 
 */
app.use(express.urlencoded({extends:true}));
app.use(express.json({limit:'10mb'}));
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));




/**
 *  Routers
 */

app.use('/api',authRouter);
app.use('/api',detailsRouter);
app.use('/api',newproductRouter);
app.use('/api',paymentRouter)


/**
 *  listenning:
 */

app.listen(PORT, ()=>{
    console.log(`the app is on port ${PORT}and the hostname is http://localhost:${PORT}
    `);
})
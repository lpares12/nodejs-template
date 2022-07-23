const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

/////
// Parser
/////
app.use((req, res, next) => {
  if(req.originalUrl === '/subscription/stripe/webhook'){
    next();
  }else{
    express.json()(req, res, next);
  }
});
app.use(express.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded


/////
// Static files configuration
/////
app.use(express.static(__dirname + '/public'));


/////
// Moongoose stuff
/////
var mongoDB = process.env.DATABASE_URL;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

//Handle connection error
db.on('error', console.error.bind(console, 'connection error:'));
db.on('close', () => { console.log(' lost DB connection'); });
db.on('reconnect', () => { console.log(' reconnected to DB'); });
db.once('open', function(){
  console.log("Connected to DB");
});


/////
// Cors configuration
/////
app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://localhost:8080',
  ],
  credentials: true,
}));


/////
// Set email
/////
emailer = require("./app/infrastructure/utils/emailer.js");
emailer.setUp();

/////
// Initialize stripe interface
/////
stripe = require("./app/infrastructure/utils/stripe.js");
stripe.setUp();

/////
// Load Routes
/////
var router = require('./routes/routes');
var userRouter = require('./routes/user');
var subscriptionRouter = require('./routes/subscription');
app.use('/', router);
app.use('/user', userRouter);
app.use('/subscription', subscriptionRouter);

/////
// Server start
/////

app.listen(5656, () => {
  console.log('Server started at http://localhost:5656');
})

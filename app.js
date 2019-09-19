require('dotenv').config();

var express = require('express');
var app = express();
var review = require('./controllers/reviewcontroller');
var user = require('./controllers/usercontroller');
var sequelize = require('./db');

sequelize.sync(); // tip: {force: true} for resetting tables
app.use(express.json());
app.use(require('./middleware/headers'));
/******************
 * EXPOSED ROUTES
*******************/
app.use('/user', user);

/******************
 * PROTECTED ROUTES
*******************/

app.use(require('./middleware/validate-session'));
app.use('/review', review);


app.listen(process.env.PORT, function(){
    console.log('App is listening on 3000. (PERN Project)')
});
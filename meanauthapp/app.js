const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const  cors = require('cors');
const  passport = require('passport');
const  mongoose = require('mongoose');
const config = require('./config/database');

//connect to database
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

//on error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

const app = express();


const users = require('./routes/users');
const port = 3000;

//cors middleware
app.use(cors());

//Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//index route
app.get('/', (req, res) => {
    res.send('Invalid End');
});

app.use('/users', users);

//start server
app.listen(port, () => {
    console.log("Server started on port "+port);
});
const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./configs/db');
const expressSession = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
require('dotenv').config();
//* declare routes
const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');
const classRoute = require('./routes/class');
const studentRoute = require('./routes/student');
//*end declare
db.connect();
const app = express();
require('./configs/hbscustom');
require('./configs/passport')(passport);
app.use(expressSession({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 3600 * 24
    }
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//views
app.use(express.static('public'))
app.engine('hbs', hbs({
    partialsDir: path.join(__dirname, 'views/patials'),
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//* use routes
app.use('/', indexRoute);
app.use('/user', userRoute);
app.use('/class',classRoute);
app.use('/student',studentRoute);
//*end use
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
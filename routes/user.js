const router = require('express').Router()
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Class = require('../models/class');
const passport = require('passport');
//create teacher
router.post('/login', passport.authenticate('local-signin', {
    failureRedirect: '/user/login',
    failureFlash: true
}), (req, res) => {
    res.locals.user = req.user;
    res.redirect('/academy')
})
router.get('/login', (req, res,next) => {
    if(req.user){
        return next();
    }
    res.render('user/login', {
        message: req.flash('error')
    });
})
router.get('/register', (req, res) => {
    if(req.user){
        return next();
    }
    res.render('user/register', {
        message: req.flash('error')
    })
})
//new teacher 
router.post('/register', passport.authenticate('local-signup', {
    failureRedirect: '/user/register',
    failureFlash: true
}), (req, res) => {
    res.redirect('/')
})



//*log out
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
module.exports = router;
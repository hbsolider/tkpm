const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Teacher = require('../models/teacher');

module.exports = passport => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(async (id, done) => {
        Teacher.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        await Teacher.findOne({
            email: email
        }).then(teacher => {
            if (teacher) {
                bcrypt.compare(password, teacher.password).then(bool => {
                    if (bool) {
                        done(null, teacher);
                    } else {
                        done(null, false, {
                            message: "Password Incorrect"
                        });
                    }
                })
            } else {
                done(null, false, {
                    message: "Email exists!!!"
                })
            }
        })
    }))
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        await Teacher.findOne({
            email: email
        }).then(async (have) => {
            if (have) {
                return done(null, false, {
                    message: "Invalid email"
                });
            } else {
                const salt = bcrypt.genSaltSync(11);
                const newpass = bcrypt.hashSync(req.body.password, salt);
                const teacher = new Teacher({
                    name: req.body.name,
                    email: req.body.email,
                    password: newpass,
                    address: req.body.address
                })
                try {
                    const user = await teacher.save();
                    done(null, user)
                } catch (error) {
                    done(null, false, {
                        message: error
                    })
                }
            }
        })
    }))
}
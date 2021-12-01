const passport = require('passport');
const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const { body, validationResult } = require('express-validator');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.all_id(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    
    body('email', 'Invalid email').notEmpty().isEmail();
    body('password', 'Invalid password').notEmpty().isLength({min:8});
    let errors = validationResult(req);
    if (errors) {
        let messages = [];
        errors.throw(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.all_id({'email': email}, function(err, user) {
        if (err) {
           return done(err); 
        }
        if (user) {
            return done(null, false, {message: 'Email is already in use.'});
        }
        let newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result) {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    body('email', 'Invalid email').notEmpty().isEmail();
    body('password', 'Invalid password').notEmpty();
    let errors = validationResult(req);
    if (errors) {
        let messages = [];
        errors.throw(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.all_id({'email': email}, function(err, user) {
        if (err) {
           return done(err); 
        }
        if (!user) {
            return done(null, false, {message: 'No user found.'});
        }
        if (!user.validPassword(password)) {
            return done(null, false, {message: 'Wrong password.'});
        }
        return done(null, user);
    });
}));
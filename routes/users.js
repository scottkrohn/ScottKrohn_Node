var express = require('express');
const path = require('path');
const router = express.Router();
exports.router = router;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../model/user-rest-model');

exports.initPassport = function(app){
    app.use(passport.initialize());
    app.use(passport.session());
};

// Checks if the user is logged/authenticated, if not redirects to login page.
exports.ensureAuthenticated = function(req, res, next){
    if(req.user) next();
    else res.redirect('/users/login');
};

/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.render('login', {title: 'User Login', user: res.user});
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'login'
}));

router.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/');
});

passport.use(new LocalStrategy(function(username, password, done){
    userModel.passwordCheck(username, password).then(function(result){
        if(result.check){
            console.log('PW match!');
            done(null, {id: result.username, username: result.username});
        }
        else{
            console.log(result.message);
            done(null, false, result.message);
        }
    }).catch(function(err){
        done(err);
    });

}));

passport.serializeUser(function(user, done){
    console.log("serializeUser called");
    done(null, user.username);
});

passport.deserializeUser(function(username, done){
    console.log("DE-serializeUser called");
    userModel.find(username).then(user => {
        done(null, user);
    }).catch(err => {
        done(err);
    });
});


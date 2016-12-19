/**
 * Created by smk on 12/3/2016.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('contact', {
        title: "Contact Me",
        user: req.user ? req.user : undefined
    });
});

module.exports = router;

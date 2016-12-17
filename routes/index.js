var express = require('express');
var router = express.Router();
const db = require('../model/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    db.setupInitialValues();
    var linkedin;
    db.getLinkedInUrl().then(linkedInUrl=> {
        res.render('index', { title: 'Scott Krohn', linkedin: linkedInUrl});
    });
});

module.exports = router;

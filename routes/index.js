var express = require('express');
var router = express.Router();
const db = require('../model/db.js');
const util = require('util');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("req.user in index.js: " + util.inspect(req.user));
    db.getUrls().then(urls => {
        console.log("req.user in index.js: " + util.inspect(req.user));
        res.render('index', {
            title: "Scott Krohn",
            urls: urls,
            user: req.user ? req.user : undefined
        });
    });
});

module.exports = router;

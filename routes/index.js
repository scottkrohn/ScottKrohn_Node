var express = require('express');
var router = express.Router();
const db = require('../model/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    db.getUrls().then(urls => {
        res.render('index', {title: "Scott Krohn", urls: urls});
    });
});

module.exports = router;

/**
 * Created by smk on 12/7/2016.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next){

    // Load the cached version of the User data from a local JSON file.
    var fileUserData = JSON.parse(fs.readFileSync("githubData"));

    var rp = require('request-promise');
    // Set options for http GET request.
    var userOptions = {
        uri: 'http://api.github.com/users/scottkrohn',
        json: true,
        headers: {'User-Agent': 'scottkrohn', 'If-Modified-Since': fileUserData['headers']['last-modified']},
        resolveWithFullResponse: true
    };



    // Perform REST service call and get promise response.
    var userDataPromise = rp(userOptions);
    // By default we'll use cached use data unless an update is detected
    var cacheUsed = true;

    userDataPromise.then(function(response){
        // Github user profile has been modified, get new version and cache it.
        fs.writeFileSync("githubData", JSON.stringify(response));
        fileUserData = response;
        cacheUsed = true; // Flag to determine if we need to fetch new repo data
        console.log("Github user data updated.");
    }).catch(function(err){
        // If it's a 304 status code (No update to user data), ignore it.
        if(err.statusCode == 304){
            console.log("Github user cache used.");
        }
        // If it's another error status code, display the error.
        else{
            next(err);
        }
    }).then(function(){
        var repoData;
        if(!cacheUsed){
            var repoOptions = {
                uri: 'http://api.github.com/users/scottkrohn/repos',
                json: true,
                headers: {'user-agent': 'scottkrohn'}
            };

            // Perform REST call to github api to get repo data.
            rp(repoOptions).then(function(response){
                repoData = response;
                console.log("Repo data updated.")
            }).catch(function(err){
                next(err);
            })
        }
        else{
            repoData = JSON.parse(fs.readFileSync("githubRepoData"));
            console.log("Repo cache data used.");
        }
        res.render('projects', {
            title: "My Projects",
            userData: fileUserData['body'],
            repoData: repoData,
            user: req.user ? req.user : undefined
        });

    });
});


module.exports = router;
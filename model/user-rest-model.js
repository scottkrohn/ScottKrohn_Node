/**
 * Created by smk on 12/19/2016.
 */

'use strict';

const restify = require('restify');

// Create a Promise that resolves to a JSON client that can connect to the REST service.
var connectREST = function(){
    return new Promise((resolve, reject) => {
        try{
            resolve(restify.createJsonClient({
                url: process.env.USER_SERVICE_URL,
                version: "*"
            }));
        }
        catch(err){
            reject(err);
        }
    }).then((client) => {
          return client;
    });
};

exports.passwordCheck = function(username, password){
    return connectREST().then((client)=>{
        return new Promise((resolve, reject) => {
            client.post('/passwordCheck', {username, password}, (err, req, res, obj) => {
                if(err) return reject(err);
                resolve(obj);
            });
        });
    });
};

exports.find = function(username){
    return connectREST().then(client => {
        return new Promise((resolve, reject) => {
            client.get('/find/' + username, (err, req, res, obj) => {
                if(err) return reject(err);
                resolve(obj);
            });
        })
    });
};
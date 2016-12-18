/**
 * Created by smk on 12/18/2016.
 */

const fs = require('fs-extra');
const Sequelize = require('sequelize');

var connectDB = function(){
    var SQconn;
    var seq;

    if(SQconn) return SQconn.sync();

    return new Promise((resolve, reject) => {
    });

};

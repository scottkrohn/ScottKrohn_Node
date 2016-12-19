/**
 * Created by smk on 12/17/2016.
 */

const util = require('util');
const fs = require('fs-extra');
const jsyaml = require('js-yaml');
const Sequelize = require('sequelize');

// Vars used for querying.
const first = "Scott";
const last = "Krohn";

exports.connectDB = function(){
    var SQconnection;
    var sequelz;

    if(SQconnection) return SQconnection.sync();

    return new Promise((resolve, reject) => {
        fs.readFile('sequelize_mysql.yaml', 'utf8', (err, data) => {
            if(err) reject(err);
            else resolve(data);
        });
    }).then(data => {
      return jsyaml.safeLoad(data, 'utf8');
    }).then(params => {
        sequelz = new Sequelize(params.dbname, params.username, params.password, params.params);

        // Define a model representing a table in the database.
        SQconnection = sequelz.define('person', {
            firstName: {type: Sequelize.STRING, primaryKey: true},
            middleName: Sequelize.STRING,
            lastName: {type: Sequelize.STRING, primaryKey: true},
            email: Sequelize.STRING,
            workEmail: Sequelize.STRING,
            linkedinUrl: Sequelize.STRING,
            githubUrl: Sequelize.STRING,
            facebookUrl: Sequelize.STRING,
            bday: Sequelize.DATE
        });
        return SQconnection.sync();
    });
};

exports.setupInitialValues = function(){
    // Add my default info to DB.
    exports.connectDB().then(SQconnection => {
        SQconnection.find({where: {firstname: first , lastName: last}}).then(person =>{
            if(!person){
                SQconnection.create({
                    firstName: "Scott",
                    middleName: "Michael",
                    lastName: "Krohn",
                    email: "skrohn86@gmail.com",
                    workEmail: "skrohn86@gmail.com",
                    linkedinUrl: "https://www.linkedin.com/in/scott-krohn-06b66592",
                    githubUrl: "https://www.github.com/scottkrohn",
                    facebookUrl: "https://www.facebook.com/scott.krohn",
                    bday: "05-19-1986"
                });
            }
            else{
            }
        });
    });
};

exports.getUrls = function() {
    return exports.connectDB().then(SQconnection => {
        return new Promise((resolve, reject) => {
            SQconnection.find({where: {firstName: first, lastName: last}}).then(person => {
                if (!person) {
                    exports.setupInitialValues();
                    resolve({linkedin: "#", github: "#", facebook: "#"});
                }
                else {
                    resolve({linkedin: person.linkedinUrl, github: person.githubUrl, facebook: person.facebookUrl});
                }
            });
        });
    });
};




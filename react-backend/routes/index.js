var express = require('express');
var router = express.Router();
var fs = require("fs");
const MongoClient = require(process.env.db).MongoClient;
const mongoClient = new MongoClient(process.env.url, { useNewUrlParser: true });

module.exports = function() {
    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index', {title: 'Express'});
    });

    router.post("/signup", function (req, res, next) {
        mongoClient.connect(function(err, client){

              const db = client.db(process.env.dbClient);
              const collection = db.collection(process.env.dbCollection);

            collection.insertOne(req.body, function(err, result){
                if(err){
                    return console.log(err);
                }
            });
        });
    });

    router.post("/login", function (req, res, next) {
        mongoClient.connect(function(err, client){

            const db = client.db(process.env.dbClient);
            const collection = db.collection(process.env.dbCollection);

            collection.findOne({
                "username": req.body.username,
                "password": req.body.password
            }, function(err, user){
                if(err){
                    return console.log(err);
                }
                console.log(user);
                res.json(user);
            });
        });
    });


    router.post("/update", function (req, res, next) {
        mongoClient.connect(function(err, client){

            const db = client.db(process.env.dbClient);
            const collection = db.collection(process.env.dbCollection);

            collection.update({
                 "username": req.body.username,
                 "password": req.body.password
            }, {$set: {
                    "userEvents": req.body.userEvents,
                    "fullUserEvents": req.body.fullUserEvents,
                }})
        });
    });

    router.post("/download", function (req, res, next) {
        mongoClient.connect(function(err, client){

            const db = client.db(process.env.dbClient);
            const collection = db.collection(process.env.dbCollection);

            collection.findOne({
                "username": req.body.username,
                "password": req.body.password
            }, function(err, user){
                if(err){
                    return console.log(err);
                }
                fs.writeFile("../user/userEvent.json", JSON.stringify(user.userEvents), function(err) {
                    if (err) {
                        console.log(err);
                    }
                });

                res.download("../user/userEvent.json", "userEvent.json", function (err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("loading");
                    }
                });

                fs.writeFile("../user/userEvent.json", "", function(err) {
                    if (err) {
                        console.log(err);
                    }
                });

            });
        });
    });

    return router;
};




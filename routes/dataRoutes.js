const express = require('express');
const mongodb = require('mongodb');

const path = require("path");




const url = 'mongodb+srv://iliass:maze@cluster0.ioodi.mongodb.net/csv-sale?retryWrites=true&w=majority';
const dbName = 'csv-sale';
let db;

mongodb.MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    db = client.db(dbName);
    
});
const router = express.Router();



router.get('/data', (req, res) => {
  db.collection('users').find({}).toArray((err, data) => {
      res.send(data);
  });
});


module.exports = router;




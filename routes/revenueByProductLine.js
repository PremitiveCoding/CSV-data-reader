const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/User');
const router = express.Router();

router.get('/revenue-by-product-line', (req, res) => {
    User.aggregate([
        { $group: { _id: "$productLine", totalRevenue: { $sum: "$total" } } }
    ], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
});


module.exports = router;

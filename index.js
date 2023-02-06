// Requiring the necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Sale = require('./Models/Sale');

// Connection URL for MongoDB
const mongodbUri = 'mongodb+srv://iliass:maze@cluster0.ioodi.mongodb.net/csv-sale?retryWrites=true&w=majority';

// Connecting to the MongoDB using Mongoose
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
});

// Logging a message if the connection is successful
mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb...");
});

// Logging an error message if the connection fails
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo", err);
});

// Initializing Express
const app = express();

// Using the cors middleware for handling cross-origin requests
app.use(cors());

// Importing the `csvRoutes` and using it in the app
const csvRoutes = require("./routes/csvRoutes");
app.use("/api/uploadCsv", csvRoutes);

// Serving the public directory as static files
app.use("/public", express.static(path.join(__dirname, "public")));

// Route for getting the total revenue by product line
app.get('/revenue_by_productLine', (req, res) => {
  Sale.aggregate([
      { $group: { _id: "$productLine", totalRevenue: { $sum: "$grossIncome" } } }
  ], (err, result) => {
      if (err) {
          res.status(500).send(err);
      } else {
          res.json(result);
      }
  });
});

// Route for getting the total number of purchases by customer type
app.get('/purchases_by_customerType', (req, res) => {
  Sale.aggregate([
      {
          $group: {
              _id: '$customerType',
              totalPurchases: {$sum: 1}
          }
      }
  ], (err, result) => {
      if(err) res.send(err);
      res.json(result);
  });
});

// Route for getting the average rating by gender
app.get('/average_rating_by_gender', (req, res) => {
  Sale.aggregate([
  {
  $group: {
  _id: '$gender',
  avgRating: {$avg: '$rating'}
  }
  }
  ], (err, result) => {
  if(err) res.send(err);
  res.json(result);
  });
  });



// Route to return sales by city
app.get('/sales_by_city', (req, res) => {
// Use the aggregate method to group all sales by city
Sale.aggregate([
{
// Use the $group operator to group by the city field
$group: {
_id: '$city', // Group by the 'city' field
totalSales: { $sum: '$total' } // Sum the total field for each group
}
}
], (err, result) => {
// If there's an error, send it back as a response
if(err) res.send(err);
// Otherwise, send the result of the aggregation as a JSON response
res.json(result);
});
});

// Route to return the cost of purchases by product line
app.get('/purchases_by_productLine', (req, res) => {
// Use the aggregate method to group all purchases by product line
Sale.aggregate([
{
// Use the $group operator to group by the productLine field
$group: {
_id: '$productLine', // Group by the 'productLine' field
totalCosts: { $sum: '$cogs' } // Sum the cogs field for each group
}
}
], (err, result) => {
// If there's an error, send it back as a response
if(err) res.send(err);
// Otherwise, send the result of the aggregation as a JSON response
res.json(result);
});
});

// Listen to incoming requests on port 4001
app.listen(4001, () => {
console.log("App is running on PORT 4001");
});
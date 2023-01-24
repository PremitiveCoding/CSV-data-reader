const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Sale = require('./Models/Sale');


// Mongo connection
const mongodbUri = 'mongodb+srv://iliass:maze@cluster0.ioodi.mongodb.net/csv-sale?retryWrites=true&w=majority';
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb...");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo", err);
});


const app = express();

app.use(cors());

// CSv to Mongodb API
const csvRoutes = require("./routes/csvRoutes");
app.use("/api/uploadCsv", csvRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));


// API : Revenue brut ( Gross volume ) par catégorie ( Product Line ).
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

// API : Nombre total des achats par type de client.
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

// API : Moyenne de rating par sexe
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
  




// server port
app.listen(4001, () => {
  console.log("App is running on PORT 4001");
});

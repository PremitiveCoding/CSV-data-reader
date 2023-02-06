const express = require("express"); // Import the "express" module for creating a router
const csvController = require("../controllers/csvController"); // Import the "csvController" for handling CSV uploads
const multer = require("multer"); // Import the "multer" module for handling file uploads
const fs = require("fs"); // Import the built-in "fs" module for working with the file system
const path = require("path"); // Import the built-in "path" module for constructing file paths

const storage = multer.diskStorage({ // Define the storage options for the "multer" module
  destination: function (req, file, cb) { // Specify the destination directory for the uploaded files
    if (!fs.existsSync("public")) { // Check if the "public" directory exists
      fs.mkdirSync("public"); // If not, create it
    }

    if (!fs.existsSync("public/csv")) { // Check if the "public/csv" directory exists
      fs.mkdirSync("public/csv"); // If not, create it
    }

    cb(null, "public/csv"); // Call the callback function with a null error and the destination directory
  },
  filename: function (req, file, cb) { // Specify the filename for the uploaded file
    cb(null, Date.now() + file.originalname); // Call the callback function with a null error and the concatenation of the current timestamp and the original filename
  },
});

const upload = multer({
  storage: storage, // Use the "storage" options defined above
  fileFilter: function (req, file, cb) { // Specify a file filter function to validate the uploaded file
    var ext = path.extname(file.originalname); // Get the file extension

    if (ext !== ".csv") { // If the file extension is not ".csv"
      return cb(new Error("Only csvs are allowed!")); // Call the callback function with an error message indicating that only CSV files are allowed
    }

    cb(null, true); // If the file is a CSV, call the callback function with a null error and a "true" value
  },
});

const router = express.Router(); // Create a new router instance

// Define a new endpoint for handling CSV uploads
router.post(
  "/create",
  upload.single('csvFile'), // Use the "multer" middleware to handle the file upload and expect a single file with the key "csvFile"
  csvController.create // Use the "csvController" to handle the uploaded CSV data
);



module.exports = router; // Export the router for use in other parts of the code


//This code is setting up an Express router and defining a single endpoint for uploading a CSV file. 
//The endpoint will handle a single file and expects it to be named "csvFile" in the form data.
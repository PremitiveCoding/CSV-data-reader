const fs = require('fs'); // Import the built-in "fs" module for reading the contents of a file
const path = require('path'); // Import the built-in "path" module for constructing the file path
const csv = require('fast-csv'); // Import the "fast-csv" module for parsing CSV data
const Sale = require("../Models/Sale"); // Import the "Sale" model for creating new sales records

exports.create = async (req, res) => { // Exporting the "create" function to be used in other parts of the code
  console.log(req.file); // Log the uploaded file information to the console (for debugging purposes)
  const totalRecords = []; // Initialize an empty array to store the parsed CSV records
  
  try {
    console.log(path.join(__dirname, '../', '/public/csv/' + req.file.filename)) // Log the constructed file path to the console (for debugging purposes)
    // Use the "fs" module to read the contents of the uploaded file and pipe it through the "fast-csv" module's parse function
    fs.createReadStream(path.join(__dirname, '../', '/public/csv/' + req.file.filename))
      .pipe(csv.parse({ headers: true })) // Specify that the first row of the CSV file contains the headers/column names
      .on('error', error => console.error(error)) // Log any errors that occur during the parsing process to the console
      .on('data', row => totalRecords.push(row)) // For each parsed row, push the data into the "totalRecords" array
      .on('end', async rowCount => { // When the parsing is finished
        try {
          const sales = await Sale.insertMany(totalRecords); // Use the "Sale" model to insert all of the records into the "sales" collection in the database
          
          res.json(sales); // Return the created sales records as the response
        } catch(err) {
          res.status(400).json(err); // If there is an error, return a status code of 400 and the error message as the response
        }
      });
  } catch(error) {
    res.status(400).json(error) // If there is an error, return a status code of 400 and the error message as the response
  }
};


//When this function is called, it will read the contents of the uploaded file, 
//parse the contents into individual records,
//and then store each record as a new document in the "sales" collection

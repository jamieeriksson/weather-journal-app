const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create app instance
const app = express();
// Set dependencies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Start server
const port = 8000;
const server = app.listen(port, () =>
  console.log(`Server started. Running on localhost: ${port}.`)
);

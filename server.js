// Empty JS object to act as endpoint for all routes
const projectData = {};

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create app instance
const app = express();
// Set dependencies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize main project folder
app.use(express.static("website"));

// Start server
const port = 8000;
const server = app.listen(port, () =>
  console.log(`Server started. Running on localhost: ${port}.`)
);

// Routes
app.get("/weather", function (req, res) {
  res.send(projectData);
});

app.post("/weather", addEntry);

function addEntry(req, res) {
  projectData.date = req.body.date;
  projectData.temp = req.body.temp;
  projectData.feelings = req.body.feelings;
  res.send(projectData);
}

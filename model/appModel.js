const mongoose = require("mongoose");

// Define the schema
const appSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  developerName: {
    type: String,
    required: true,
  },
  reviews: Array(String),
});

// Create a model based on the schema
const App = mongoose.model("App", appSchema);

module.exports = App;

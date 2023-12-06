const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
  // Title of the mobile app
  title: { type: String, required: true },

  // Description of the mobile app
  description: { type: String, required: true },

  // User who submitted the app for testing
  developer: { type: String, require: true },
  appUrl: { type: String, require: true },
  device: { type: String, require: true },

  // User reviews for the mobile app
  reviews: Array(String),

  // Array of image URLs for the mobile app
  imageUrl: [{ type: String, required: true }],

  // Timestamp for when the app was created
  createdAt: { type: Date, default: Date.now },

  // Timestamp for when the app was last updated
  updatedAt: { type: Date, default: Date.now },
});

const App = mongoose.model("App", appSchema);

module.exports = App;

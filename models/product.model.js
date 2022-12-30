const mongoose = require("mongoose");

// Create a schema for Products
const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    availableItems: {
      type: Number,
      required: true,
    },
    imageURL: {
      type: String,
    },
  }, { timestamps: true })

// Create a model for Products
exports.Product = mongoose.model(
  "product", productSchema
);

const Joi = require("joi");
const mongoose = require("mongoose");

// Create schema for Addresses
const addressSchema =  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
    },
    street: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
  }, { timestamps: true });

// Create Model for Addresses
const Address = mongoose.model(
  "address",
  addressSchema
);

// Logic for vaidating address data provided in request
const validateAddress = (address) => {
    const addressSchema = Joi.object({
      name: Joi.string().min(0).max(50).required(),
      contactNumber: Joi.number().min(1000000000).max(99999999999).required().messages({
        'number.min': 'Invalid contact number!',
        'number.max': 'Invalid contact number!'
      }),
      city: Joi.string().min(0).max(50).required(),
      zipCode: Joi.number().min(100000).max(999999).required().messages({
        'number.min': 'Invalid zip code!',
        'number.max': 'Invalid zip code!'
      }),
      landmark: Joi.optional(),
      state: Joi.required(),
      street: Joi.required()
    });
  
    const validationResult = addressSchema.validate(address);
    return validationResult;
  };

module.exports = { Address, validateAddress };

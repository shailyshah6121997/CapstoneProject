const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { ADMIN, USER } = require("../constants/constants");

const UserSchema =  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
      maxLengh: 255,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 1024,
    },
    role: {
      type: String,
      enum: [ADMIN, USER],
      default: USER,
    },
    contactNumber: {
      type: Number,
      min: 1000000000,
      unique: true,
    },
  }, { timestamps: true });

const User = mongoose.model(
  "user", UserSchema
);

const validateUser = (user) => {
  const userSchema = Joi.object({
    firstName: Joi.string().min(0).max(50).required(),
    lastName: Joi.string().min(0).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().min(5).max(255).required().messages({
      'string.email' : 'Invalid email-id format!',
      'string.min' : 'Invalid email-id format!',
      'string.max': 'Invalid email-id format!'
    }),
    contactNumber: Joi.number().min(1000000000).max(9999999999).required().messages({
      'number.min': 'Contact Number should be of 10 digits.',
      'number.max': 'Contact Number should be of 10 digits.'
    })
  });

  const validationResult = userSchema.validate(user);
  return validationResult;
};

const validatePassword = ({ name, password }) => {
  if (password.toLowerCase().includes(name.toLowerCase())) {
    return { error: "Password cannot contain username" };
  }
  return passwordComplexity().validate(password);
};

module.exports = { User, validateUser, validatePassword };
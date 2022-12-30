const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/user.model');
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { AUTH_TOKEN, ADMIN } = require("../constants/constants");

// Logic for signing in
exports.sign_in = async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email: email});

    // Check if user exists or not
    if (!user) {
        return res.status(401).send("This email has not been registered!");
    }

    // Check if the password matches or not
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(401).send("Invalid Credentials!");
    }

    // Create authentication token
    const token = jwt.sign(
        {
          _id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          isAdmin: user.role === ADMIN,
        },
        "1@3456Qw-"
      );

      // Pass token in reponse header
      res.header(AUTH_TOKEN, token).send({
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        isAuthenticated: true,
      });
}

// Logic for sign up
exports.sign_up = async(req, res) => {

    // Validate the user data passed
    const { error } = validateUser(req.body);

    // Respond with error if the validation for fields failed
    if (error) {
        return res.status(400).send(`Bad Request ${error}`);
    }

    // Check if user already exists
    let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res
      .status(400)
      .send("Try any other email, this email is already registered!");
  }

  // Check if number already exists for another user
  let userPhone = await User.findOne({ contactNumber: req.body.contactNumber });

  if (userPhone) {
    return res.status(400).send("Number already exists");
  }

  // Encrypting password and adding user
  try {
    const salt = await bcrypt.genSalt(10);
    const user = new User({
      ...req.body,
      password: await bcrypt.hash(req.body.password, salt),
    });
    const response = await user.save();
    res.send(_.pick(response, ["firstName", "lastName", "email", "_id"]));
  } catch (ex) {
    res.status(400).send(ex.message);
  }
}
const { validateAddress } = require("../models/address.model");
const { Address } = require("../models/address.model");
const { User } = require("../models/user.model");

exports.addAddress = async function (req, res) {   
    const user = req.user;

    // Validating data passed
    const {error} = validateAddress(req.body);

    // Respond with error message if validation fails
    if(error) {
        return res.status(400).send(`Bad Request ${error}`);
    }

    // Add address for the user logged in
    try {
        let userFound = await User.findOne({_id: user._id});
        const address = new Address({...req.body, user: userFound});
        const savedAddress = await address.save();
        console.log(savedAddress);
        let savedAdd = {...savedAddress};
        return res.send(savedAdd._doc);
    } catch(ex) {
        return res.status(400).send(ex.message);
    }
}

// Get addresses for logged in user
exports.getAddresses = async function (req, res) {
    const user = req.user;

    // Check if any addresses exists for the logged in user and if yes, respond with the details
    try {
        const addresses = await Address.find({user: user._id});
        if (addresses) {
            let modifiedAdd = addresses;
            let userFound = await User.findOne({_id : user._id});
            for (i= 0; i< modifiedAdd.length; i++) {
                modifiedAdd[i].user = userFound;
            }
            return res.send(modifiedAdd);
        }
        else {
            return res.send(addresses);
        }
    } catch(ex) {
        return res.status(400).send(ex.message);
    }
}
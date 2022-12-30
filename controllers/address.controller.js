const { validateAddress } = require("../models/address.model");
const { Address } = require("../models/address.model");
const { User } = require("../models/user.model");

exports.addAddress = async function (req, res) {   
    const user = req.user;
    const {error} = validateAddress(req.body);
    if(error) {
        return res.status(400).send(`Bad Request ${error}`);
    }

    try {
        const address = new Address({...req.body, user: user._id});
        const savedAddress = await address.save();
        console.log(savedAddress);
        let savedAdd = {...savedAddress};
        let userFound = await User.findOne({_id: user._id});
        savedAdd._doc.user = userFound;
        return res.send(savedAdd._doc);
    } catch(ex) {
        return res.status(400).send(ex.message);
    }
}

exports.getAddresses = async function (req, res) {
    const user = req.user;
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
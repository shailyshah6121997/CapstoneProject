const { Address } = require("../models/address.model");
const { Order } = require("../models/order.model");
const { Product } = require("../models/product.model");
const { User } = require("../models/user.model");

exports.createOrder = async function (req, res) {
   
    const product = await Product.findById(req.body.productId);

    if(!product) {
        return res.status(400).send(`No Product found for ID - ${req.body.productId}!`);
    }

    const address = await Address.findById(req.body.addressId);
    if(!address) {
        return res.status(400).send(`No Address found for ID - ${req.body.addressId}!`);
    }

    if(product.availableItems === 0) {
        return res.status(400).send(`Product with ID - ${req.body.productId} is currently out of stock!`);
    }

    try {
        const updatedProduct = await Product.findById(product);
        const shippingAddress = await Address.findOne({user : req.user._id});
        const user = await User.findOne({_id : req.user._id});

        const order = new Order({address : req.body.addressId, product : updatedProduct, 
            address: shippingAddress, user: user, amount: updatedProduct.price});
        const savedOrder = await order.save();

        updatedProduct.availableItems -= 1;
        await updatedProduct.save();
        console.log(savedOrder);
        if (savedOrder) {
            if (shippingAddress !== undefined)
            {
                savedOrder.address.user = user;
            }
        }
        return res.send(savedOrder);
    } catch(ex) {
        return res.status(400).send(ex.message);
    }
}
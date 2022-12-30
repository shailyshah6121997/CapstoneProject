const { Address } = require("../models/address.model");
const { Order } = require("../models/order.model");
const { Product } = require("../models/product.model");
const { User } = require("../models/user.model");

// Creating order
exports.createOrder = async function (req, res) {
   
    // Get product requested for order
    const product = await Product.findById(req.body.productId);

    // check if product exists or not
    if(!product) {
        return res.status(400).send(`No Product found for ID - ${req.body.productId}!`);
    }

    // fetch shipping address for user
    const address = await Address.findById(req.body.addressId);
    if(!address) {
        return res.status(400).send(`No Address found for ID - ${req.body.addressId}!`);
    }

    // check if product is available or not
    if(product.availableItems === 0) {
        return res.status(400).send(`Product with ID - ${req.body.productId} is currently out of stock!`);
    }

    // saving order and decrementing the available items for product
    try {
        const updatedProduct = await Product.findById(product);
        const user = await User.findOne({_id : req.user._id});

        const order = new Order({address : req.body.addressId, product : updatedProduct, 
            address: address, user: user, amount: updatedProduct.price});
        const savedOrder = await order.save();

        updatedProduct.availableItems -= 1;
        await updatedProduct.save();
        console.log(savedOrder);
        if (savedOrder) {
            savedOrder.address.user = user;
        }
        return res.send(savedOrder);
    } catch(ex) {
        return res.status(400).send(ex.message);
    }
}
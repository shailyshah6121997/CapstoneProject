const { Product } = require('../models/product.model');

// Get all products
exports.searchProducts = async function (req, res) {
    const { category, direction = "desc", sortBy = "_id", name="" } = req.query;

    const searchObj = {};
  
    if (category) searchObj.category = category;
    searchObj.name = { $regex: name, $options: "i" }
  
    const products = await Product.find(searchObj).sort({ [sortBy]: direction });
  
    res.send(products);
}

// Get all product categories
exports.getProductCategories = async function (req, res) {
    try {
        const categories = await Product.find().select("category").distinct("category");
        res.send(categories);
      } catch (ex) {
        console.log(ex.message);
      }
}

// Getting product by ID
exports.getProductById = async function (req, res) {
    let product = await Product.findById(req.params.id);

    if(!product) {
        res.status(404).send(`No Product found for ID - ${req.params.id}!`)
        return;
    }

    res.send(product);
}

// Adding product
exports.saveProduct = async function (req, res) {
    const requestBody = req.body;

    const product = new Product(requestBody)
    try {
        const savedProduct = await product.save();
        res.send(savedProduct); 
    }  catch(ex) {
        return res.status(400).send(ex.message);
    }
}

//Updating product details by ID
exports.updateProductDetails = async function (req, res) {
    let product = await Product.findById(req.params.id);

    // Check if product exists in the database
    if(!product) {
        res.status(404).send(`No Product found for ID - ${req.params.id}!`);
        return;
    }

    const requestBody = req.body;
    
    // updating the product
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, requestBody, {new: true});
        res.send(updatedProduct);
    }  catch(ex) {
        return res.status(400).send(ex.message);
    }
}

// Deleting product by ID
exports.deleteProduct = async function (req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        // Check if product exists and was deleted or not
        if(!product) {
            res.status(404).send(`No Product found for ID - ${req.params.id}!`);
            return;
        }
        else {
            res.send(`Product with ID - ${req.params.id} deleted successfully!`);
        }
    } catch(ex) {
        return res.send(ex.message);
    }
}
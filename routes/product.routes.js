module.exports = function(app) {
    const authMiddleware = require('../middlewares/auth.middleware');
    const adminMiddleware = require('../middlewares/admin.middleware');
    const productHandler = require('../controllers/product.controller');

    // Add product if the logged in user is admin
    app.route("/api/v1/products").post(authMiddleware.auth, adminMiddleware.admin, productHandler.saveProduct);

    // Show all the products
    app.route("/api/v1/products").get(productHandler.searchProducts);

    // Show all the product categories
    app.route("/api/v1/products/categories").get(productHandler.getProductCategories);

    // Get product by ID
    app.route("/api/v1/products/:id").get(productHandler.getProductById);

    // Update product data by ID
    app.route("/api/v1/products/:id").put(productHandler.updateProductDetails);

    // Delete product by ID
    app.route("/api/v1/products/:id").delete(productHandler.deleteProduct);
}
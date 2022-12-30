module.exports = function(app) {
    const authMiddleware = require('../middlewares/auth.middleware');
    const adminMiddleware = require('../middlewares/admin.middleware');
    const productHandler = require('../controllers/product.controller');
    app.route("/api/v1/products").post(authMiddleware.auth, adminMiddleware.admin, productHandler.saveProduct);
    app.route("/api/v1/products").get(productHandler.searchProducts);
    app.route("/api/v1/products/categories").get(productHandler.getProductCategories);
    app.route("/api/v1/products/:id").get(productHandler.getProductById);
    app.route("/api/v1/products/:id").put(productHandler.updateProductDetails);
    app.route("/api/v1/products/:id").delete(productHandler.deleteProduct);
}
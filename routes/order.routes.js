module.exports = function(app) {
    var authMiddleware = require('../middlewares/auth.middleware');
    var orderHandler = require('../controllers/order.controller');

    // Create order for the logged in user
    app.route("/api/v1/orders").post(authMiddleware.auth, orderHandler.createOrder);
}
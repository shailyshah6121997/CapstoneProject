module.exports = function(app) {
    var authMiddleware = require('../middlewares/auth.middleware');
    var orderHandler = require('../controllers/order.controller');
    app.route("/api/v1/orders").post(authMiddleware.auth, orderHandler.createOrder);
}
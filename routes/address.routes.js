module.exports = function(app) {
    var authMiddleware = require('../middlewares/auth.middleware');
    var addressHandler = require('../controllers/address.controller');
    app.route('/api/v1/addresses').post(authMiddleware.auth, addressHandler.addAddress);
    app.route('/api/v1/addresses').get(authMiddleware.auth, addressHandler.getAddresses);
}
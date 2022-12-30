module.exports = function(app) {
    var authMiddleware = require('../middlewares/auth.middleware');
    var addressHandler = require('../controllers/address.controller');

    // Adding address for the logged in user
    app.route('/api/v1/addresses').post(authMiddleware.auth, addressHandler.addAddress);

    // Getting addresses for the logged in user
    app.route('/api/v1/addresses').get(authMiddleware.auth, addressHandler.getAddresses);
}
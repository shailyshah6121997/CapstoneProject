module.exports = function(app) {
    var authHandler = require('../controllers/auth.controller');

    // Sign up
    app.route("/api/v1/users").post(authHandler.sign_up);

    // Sign in
    app.route("/api/v1/auth").post(authHandler.sign_in);
}
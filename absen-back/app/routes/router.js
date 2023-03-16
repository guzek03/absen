const auth = require('../controllers/auth');
const duplicateEmailMiddleware = require("../middlewares/duplicateEmail");
const verifyJwtToken = require('../middlewares/verifyJwtToken');
const profile = require('../controllers/profile');

module.exports = function (app) {

	app.post('/auth/signup', duplicateEmailMiddleware.checkDuplicateEmail, auth.signup);
	app.post('/auth/signin', auth.signin);

	app.get('/profile', verifyJwtToken.verifyToken, profile.getProfile);

}
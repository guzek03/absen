const auth = require('../controllers/auth');
const duplicateEmailMiddleware = require("../middlewares/duplicateEmail");
// const verifyJwtTokenController = require('../controllers/verifyJwtToken');

module.exports = function (app) {

	//User Auth
	app.post('/api/auth/signup', duplicateEmailMiddleware.checkDuplicateEmail, auth.signup);

	app.post('/api/auth/signin', auth.signin);

}
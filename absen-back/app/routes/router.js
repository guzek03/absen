const auth = require('../controllers/auth');
const duplicateEmailMiddleware = require("../middlewares/duplicateEmail");
const verifyJwtToken = require('../middlewares/verifyJwtToken');
const profile = require('../controllers/profile');
const attendance = require('../controllers/attendance');

module.exports = function (app) {

	app.post('/auth/signup', duplicateEmailMiddleware.checkDuplicateEmail, auth.signup);
	app.post('/auth/signin', auth.signin);

	app.get('/profile/:id', verifyJwtToken.verifyToken, profile.getProfile);
	app.patch('/updateProfile', verifyJwtToken.verifyToken, profile.updateProfile);

	app.post('/attendance', verifyJwtToken.verifyToken, attendance.postAttendance)

}
const jwt = require('jsonwebtoken');

module.exports = {
	verifyToken(req, res, next) {
		let tokenHeader = req.headers['Authorization'];

		if (!tokenHeader) {
			return res.status(500).send({
				message: "Error",
				errors: "No token on headers"
			});
		}

		if (tokenHeader.split(' ')[0] !== 'Bearer') {
			return res.status(500).send({
				message: "Error",
				errors: "Incorrect token format"
			});
		}

		let token = tokenHeader.split(' ')[1];

		if (!token) {
			return res.status(403).send({
				message: "Error",
				errors: "No token provided"
			});
		}

		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (err) {
				return res.status(500).send({
					message: "Error",
					errors: err
				});
			}
			req.userId = decoded.id;
			next();
		});
	}

}
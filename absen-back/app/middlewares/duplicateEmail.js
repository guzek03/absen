const User = require('../models').User

module.exports = {
	checkDuplicateEmail(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          auth: false,
          email: req.body.email,
          message: "Error",
          errors: "Email is already taken!"
        });
        return;
      }
      next();
    });
  }

}
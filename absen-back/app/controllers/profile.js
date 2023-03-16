const User = require('../models').User;

module.exports = {
  getProfile(req, res) {
    return User.findByPk(req.body.id)
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: "Error",
            errors: "User Not Found"
          });
        }
        const user = {
          message: "Success",
          user: data
        }
        return res.status(200).send(user);
      })
      .catch((err) => {
        res.status(400).send({
          message: "Error",
          errors: err
        });
      });
  }
}

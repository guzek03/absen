const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models').User;

module.exports = {
	signup(req, res) {
		return User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      position: req.body.position,
      nomer_hp: req.body.nomer_hp,
      is_admin: req.body.is_admin
    }).then(user => {
      res.status(200).send({
        auth: true,
        user: user,
        message: "User registered successfully!"
      });
    }).catch(err => {
      res.status(500).send({
        auth: false,
        message: "Error",
        errors: err
      });
    })
	},

	signin(req, res) {
		return User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (!user) {
        return res.status(404).send({
          message: "Error",
          errors: "User Not Found"
        });
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Error",
          errors: "Invalid Password!"
        });
      }

      var token = jwt.sign({
        email: user.email
      }, process.env.SECRET, {
        expiresIn: 86400
      });

      // req.session.user = { id: user.id, name: user.name };

      res.status(200).send({
        message: "Success",
        user: user,
        accessToken: token,
      });
      
      // res.cookie('accessToken', token)
    }).catch(err => {
      res.status(500).send({
        message: "Error",
        errors: err
      });
    });
	},

  logout(req, res) {
		return User.findOne({
      where: {
        id: req.body.id
      }
    }).then(user => {
      if (!user) {
        return res.status(404).send({
          message: "Error",
          errors: "User Not Found"
        });
      }

      // req.session.destroy();

      res.status(200).send({
        message: "Success, berhasil logout"
      });
      // res.clearCookie('accessToken');
    }).catch(err => {
      res.status(500).send({
        message: "Error",
        errors: err
      });
    });
	}
}
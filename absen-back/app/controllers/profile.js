const User = require('../models').User;

module.exports = {
  getProfile(req, res) {
    return User.findByPk(req.params.id)
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
      }
    );
  },

  async updateProfile(req, res) {
    const { id, nomer_hp } = req.body;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "Error", errors: "User not found" });
      }
  
      user.nomer_hp = nomer_hp;
      await user.save();
      return res.status(200).json({ message: 'Success, berhasil di ubah' });
    } catch (err) {
      return res.status(500).json({ message: "Error", errors: err });
    }
  }
}

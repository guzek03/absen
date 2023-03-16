'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    position: DataTypes.STRING,
    nomer_hp: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        isNumeric: true
      }
    },
    is_admin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  // (async () => {
  //   await sequelize.sync({ force: true });
  //   await sequelize.sync({});
  // })();
  return User;
};
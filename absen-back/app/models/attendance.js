'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendance.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Attendance.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY
    },
    time_in: {
      type: DataTypes.TIME
    },
    time_out: {
      type: DataTypes.TIME
    }
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  // (async () => {
  //   await sequelize.sync({ force: true });
  // })();
  return Attendance;
};
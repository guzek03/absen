const moment = require('moment');
const Attendance = require('../models').Attendance;
const User = require('../models').User;

module.exports = {
  async postAttendance(req, res) {
    const { user_id } = req.body;
    const now = moment();
    const today = now.format('YYYY-MM-DD');
    const time = now.format('HH:mm:ss');

    try {
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ message: "Error", errors: "User not found" });
      }
  
      let attendance = await Attendance.findOne({
        where: { user_id, date: today },
      });
  
      if (!attendance) {
        attendance = await Attendance.create({
          user_id,
          date: today,
          time_in: time,
        });
        return res.status(201).json({ message: 'Success, berhasil absen masuk' });
      } else {
        if (attendance.time_out !== null) {
          return res.status(400).json({ message: "Error", errors: "Absen pulang sudah dilakukan" });
        } else {
          attendance.time_out = time;
          await attendance.save();
          return res.status(200).json({ message: 'Success, berhasil absen pulang' });
        }
      }
    } catch (err) {
      return res.status(500).json({ message: "Error", errors: err });
    }
  }
}
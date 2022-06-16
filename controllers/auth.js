const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    let { rollNo, fullName, username, password, year } = req.body;
    rollNo = rollNo.toLowerCase();
    const oldUser = await User.findOne({ where: { roll_no: rollNo } });

    if (oldUser) {
      return res.status(409).json({
        message: 'User Is Already Registered! Try Logging In',
        oldUser,
      });
    }

    let encryptPassword = await bcrypt.hash(password, 15);

    const user = await User.create({
      roll_no: rollNo,
      full_name: fullName,
      username,
      password: encryptPassword,
      year,
    });

    const sessionData = {
      year: user.year,
      // uuid: user.uuid,
      roll_no: user.roll_no.toUpperCase(),
      role: user.role,
      full_name: user.full_name,
      username: user.username,
    };

    req.session.User = sessionData;

    return res
      .status(200)
      .json({ message: 'Registered Successfully', success: true, user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Failed To Create Account', success: false, err: err });
  }
};

exports.login = async (req, res) => {
  let { rollNo, password } = req.body;
  rollNo = rollNo.toLowerCase();

  try {
    const user = await User.findOne({ where: { roll_no: rollNo } });

    if (!user) {
      console.log('No User Found');
      return res.status(400).json({
        message: 'No User Found, Please Register',
        success: false,
      });
    } else {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res
          .status(400)
          .json({ message: 'Password Does Not Match', success: false });
      }
      //Data To Be Stored In Session
      const sessionData = {
        year: user.year,
        roll_no: user.roll_no.toUpperCase(),
        role: user.role,
        full_name: user.full_name,
        username: user.username,
      };

      req.session.User = sessionData;

      return res
        .status(200)
        .json({ message: 'Login Successful', data: req.session.User });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Failed To Login, Server Error',
      success: false,
      err: err,
    });
  }
};

exports.logout = (req, res) => {
  try {
    req.session.destroy();
    return res.status(200).json({
      message: 'Logged Out Successfully',
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Failed To Logout, Server Error',
      success: false,
      err: err,
    });
  }
};

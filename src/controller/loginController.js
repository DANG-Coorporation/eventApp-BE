const jwt = require("jsonwebtoken");

const LoginController = async (req, res) => {
  try {
    const token = jwt.sign(req.userObj, process.env.JWT_TOKEN);
    res.status(200).json({
      status: 200,
      message: "login success",
      token: token,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      error: e.toString(),
    });
  }
};

module.exports = LoginController;

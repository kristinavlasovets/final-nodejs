const UserModel = require("../models/user-model");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      return res
        .status(400)
        .json({ message: "Email address is already registered." });
    }
    const user = await UserModel.create({ email, password });
  }
}

module.exports = new UserService();

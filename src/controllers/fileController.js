const { User } = require("../models/User");

module.exports = {
  async getFile(req, res) {
    const { nome, telefone } = req.body;
    if (!nome || !telefone)
      return res.status(400).json({
        error: "Name and phone are required!",
      });
    return User.create(req.body)
      .then((result) => res.result(200).json(result))
      .catch((err) => res.status(500).json(err));
  },
};

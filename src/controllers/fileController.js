const { User } = require("../models/User");

module.exports = {
  async getFile(req, res) {
    if (Object.keys(req.body).length > 0)
      return User.create(req.body)
        .then((result) => res.result(200).json(result))
        .catch((err) => res.status(500).json(err));
    return res.status(400).json({
      error: "Request body cannot be empty!",
    });
  },
};

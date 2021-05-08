const { User } = require("../models/User");

module.exports = {
  getFile(req, res) {
    console.log("here ", req.body);
    if (!req.body.length === 0)
      return res.status(400).json({
        error: "Empty body data!",
      });
    const invalidData = req.body.filter((item) => !item.Nome || !item.Telefone);
    if (invalidData.length > 0)
      return res.status(400).json({
        error: "Name and phone are required!",
      });
    req.body.every(async (item) => {
      let user = await User.findOne({ Telefone: item.Telefone });
      if (user) {
        user = { ...user, ...item };
        return await user
          .save()
          .then(() => true)
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: "Database error!",
            });
            return false;
          });
      }

      return await User.create(item)
        .then(() => {
          return true;
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: "Database error!",
          });
          return false;
        });
    });
    return res.status(200).json({
      success: "Users created!",
    });
  },
};

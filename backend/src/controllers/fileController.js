const { User } = require("../models/User");
const messageServices = require("../services/messageServices");

module.exports = {
  getFile(req, res) {
    const { msg, data } = req.body;
    if (!msg || !data.length === 0)
      return res.status(400).json({
        error: "Empty body data!",
      });

    const invalidData = data.filter((item) => !item.Nome || !item.Telefone);
    if (invalidData.length > 0)
      return res.status(400).json({
        error: "Name and phone are required!",
      });

    data.every(async (item) => {
      let user = await User.findOne({ Telefone: item.Telefone });
      if (user) {
        return await User.updateOne({ id: user.id }, { ...item })
          .then(() => {
            messageServices
              .sendWhatsappMessage(item.Telefone, msg)
              .then(({ data }) => {
                console.log("[message-service]", data);
              })
              .catch((err) => {
                console.log("[message-service-error]", err);
              });
            return true;
          })
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
          messageServices
            .sendWhatsappMessage(item.Telefone, msg)
            .then(({ data }) => {
              console.log("[message-service]", data);
            })
            .catch((err) => {
              console.log("[message-service-error]", err);
            });
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

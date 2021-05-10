const axios = require("axios");

module.exports = {
  sendWhatsappMessage(number, msg) {
    return axios({
      url: "https://api2.totalvoice.com.br/sms",
      method: "post",
      headers: {
        "Access-Token": process.env.ACCESS_TOKEN,
      },
      data: {
        numero_destino: number,
        mensagem: msg,
      },
    });
  },
};

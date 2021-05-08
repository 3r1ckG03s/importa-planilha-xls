const { Schema, model } = require("mongoose");

const Userschema = new Schema(
  {
<<<<<<< HEAD:src/models/User.js
    nome: {
      type: String,
      required: true,
    },
    telefone: {
=======
    Nome: {
      type: String,
      required: true,
    },
    Telefone: {
>>>>>>> 54f326cf0202bed589cc537d3c5614d8c5eca87d:backend/src/models/User.js
      type: String,
      required: true,
    },
  },
  { strict: false }
);

exports.User = model("Users", Userschema);

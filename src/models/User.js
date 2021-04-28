const { Schema, model } = require("mongoose");

const Userschema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    telefone: {
      type: String,
      required: true,
    },
  },
  { strict: false }
);

exports.User = model("Users", Userschema);

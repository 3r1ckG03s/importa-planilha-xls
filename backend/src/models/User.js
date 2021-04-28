const { Schema, model } = require("mongoose");

const Userschema = new Schema(
  {
    Nome: {
      type: String,
      required: true,
    },
    Telefone: {
      type: String,
      required: true,
    },
  },
  { strict: false }
);

exports.User = model("Users", Userschema);

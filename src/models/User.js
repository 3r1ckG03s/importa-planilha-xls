const { Schema, model } = require("mongoose");

const Userschema = new Schema({
  phone: {
    type: String,
    required: true,
  },
});

exports.User = model("Users", Userschema);

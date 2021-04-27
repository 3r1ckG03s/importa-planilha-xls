require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fileController = require("./controllers/fileController");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/files", fileController.getFile);

app.listen(8080, () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      console.log("Servidor iniciado na porta 8080: http://localhost:8080/")
    )
    .catch((err) => console.log("Database access error ", err));
});

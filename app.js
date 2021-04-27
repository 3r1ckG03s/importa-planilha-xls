const express = require('express');
const app = express();

app.use(express.json());

app.post("/", (req, res) => {
    return res.json({Nome:'', DigitoPais:'', DDD:'', Numero:''});
});
app.listen(8080, () =>{
    console.log("Servidor iniciado na porta 8080: http://localhost:8080/");
});
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("El servidor esta corriendo en el puerto" + PORT);
})
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const dbConnect = require("./config/mongo");
const { dbConnectMysql } = require("./config/mysql");
const ENGINE_DB = process.env.ENGINE_DB;

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.static("storage"))


const PORT = process.env.PORT || 3000;

/**
 * Aqui invocamos las rutas!!
 */
app.use("/api", require("./routes"))




app.listen(PORT, () => {
  console.log("El servidor esta corriendo en el puerto" + PORT);
})
ENGINE_DB === "nosql" ? dbConnect() : dbConnectMysql();
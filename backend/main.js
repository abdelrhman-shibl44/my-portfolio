// ---- require main dependencies"
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const exhbs = require("express-handlebars");
const path = require("path");
const app = express();
//------ require("./db_services")--------
require("./db_services");
//------get port from env or take 5050
const port = process.env.PORT | 5050;
require("dotenv").config();
//-------middleWars--------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//-------start server-------
//--static file from backend file--
app.use(express.static(path.join(__dirname, "public")));
//-------template engine-------
const hbs = exhbs.create({ extname: ".hbs" });
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
// -----listen to port-------
app.listen(port, () => console.log(`port listening on ${process.env.port}`));
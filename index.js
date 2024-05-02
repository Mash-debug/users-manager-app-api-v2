require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const router = require("./routes");
const cors = require('cors');

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DB connectée !")
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(session({
    name: "uam-cookie",
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}))

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Serveur en marche sur http://localhost:${PORT} !`);
});

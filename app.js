const express = require("express");
const app = express();

const cors = require("cors");

const mongoose = require("mongoose");
var bodyParser = require('body-parser')
const userRegistration = require("./routes/userRegistration");
const postComment = require("./routes/postComment");


app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    }));



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Routes
app.use('/api/', postComment);

// app.use('/api/register/', userRegistration);

const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log('Server Running');
});

module.exports = app
// export your app so aws-serverless-express can use it
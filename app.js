const express = require("express");
const app = express();

const cors = require("cors");

const mongoose = require("mongoose");
var bodyParser = require('body-parser')
const userRegistration = require("./routes/userRegistration");
const postComment = require("./routes/postComment");
// const { MONGOURL } = require('./config');


app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    }));

mongoose
    .connect("mongodb+srv://AhmBlog:HelloAngel@angelhm-ctnpb.mongodb.net/mydb?retryWrites=true", { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => err);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Routes
app.use('/api/comments/', postComment);

app.use('/api/register/', userRegistration);

// const port = process.env.PORT || 6000;
// app.listen(port, () => {
//     console.log('Server Running');
// });

module.exports = app
// export your app so aws-serverless-express can use it
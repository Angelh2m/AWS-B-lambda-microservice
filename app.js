const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");

const userRegistration = require("./routes/userRegistration");
const postComment = require("./routes/postComment");
const { MONGOURL } = require('./config');

mongoose
    .connect(MONGOURL, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => err);

app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    }));


// Routes
app.use('/api/register/', userRegistration);
app.use('/api/comments/', postComment);


// const port = process.env.PORT || 6000;
// app.listen(port, () => {
//     console.log('Server Running');
// });

module.exports = app // export your app so aws-serverless-express can use it
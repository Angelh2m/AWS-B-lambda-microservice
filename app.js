const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require('passport');

// ***  ROUTES
const user = require("./routes/user");
const auth = require("./routes/auth");
const consultations = require("./routes/consultations");
const questions = require("./routes/questions");
const socialLogin = require("./routes/socialLogin");
const recover = require("./routes/recover");

// ***  ENV VARIABLES
const dotenv = require('dotenv');
dotenv.config();


app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    }));

app.options("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
});

const url = `mongodb://${process.env.MONGO_USER}@angelhm-shard-00-00-ctnpb.mongodb.net:27017,angelhm-shard-00-01-ctnpb.mongodb.net:27017,angelhm-shard-00-02-ctnpb.mongodb.net:27017/test?ssl=true&replicaSet=AngelHm-shard-0&authSource=admin&retryWrites=true`;

mongoose
    .connect(url, { useNewUrlParser: true, 'useCreateIndex': true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// *** PASSPORT STRATEGIES
app.use(passport.initialize());
require('./config/passport')(passport);


// ROUTES
app.use('/api/', questions);
app.use('/api/recover', recover);
app.use('/api/social-login', socialLogin);
app.use('/api/consultation', consultations);
app.use('/api/user', user);
app.use('/api/auth', auth);


// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//     console.log('Server Running port http://localhost:4000/api/');
// });

module.exports = app
// export your app so aws-serverless-express can use it



// API https://lvtx7xas0l.execute-api.us-east-1.amazonaws.com/dev
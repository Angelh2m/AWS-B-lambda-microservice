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

// ***  ENV VARIABLES
const dotenv = require('dotenv');
dotenv.config();


app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    }));

mongoose
    .connect(`mongodb+srv://${process.env.MONGO_URL}/mydb?retryWrites=true`, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => err);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// *** PASSPORT STRATEGIES
app.use(passport.initialize());
require('./config/passport')(passport);


// ROUTES
app.use('/api/', questions);
app.use('/api/consultation', consultations);
app.use('/api/user', user);
app.use('/api/auth', auth);


const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log('Server Running port http://localhost:6000/api/ ');
});

module.exports = app
// export your app so aws-serverless-express can use it
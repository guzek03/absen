const express = require("express");
const app = express();
// const cookieParser = require('cookie-parser');
// const session = require('express-session');

require("dotenv").config();

app.use(express.json());
// app.use(cookieParser());
// app.use(session({
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: false
// }));


// app.use(express.urlencoded({
//   extended: true
// }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

require('./app/routes/router')(app);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is live on port 8000");
})
// app.js
const cors = require('cors');
const express = require("express");
var path = require('path')
const bodyParser = require("body-parser");
var config = require("./config/db");
const UserController = require("./controllers/UserController");

const app = express();
const port = process.env.PORT || 3301;
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//All routes declaration is here

//user Routes
app
  .route("/api/Accounts/SignIn", )
  .post(UserController.handleSignInAttempt)

  app
  .route("/api/Accounts/SignOut", )
  .post(UserController.handleSignOutAttempt)

app
  .route("/api/Accounts/Register", )
  .post(UserController.handleRegister)





//port listener rout
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const Login = require("../models/Login");
const UserAccessToken = require('../models/UserAccessTokens')
var TokenGenerator = require('token-generator')({
  salt: 'your secret ingredient for this magic recipe',
  timestampMap: 'abcdefghij', // 10 chars array for obfuscation proposes
});

exports.handleSignInAttempt = (req, res) => {

  console.log("SIGN IN ATTEMPT FROM :", req.body)
  Login.findOne({ email: req.body.email }, (err, account) => {
    if (err) {
      console.log("Error in Server ", account)
      res.status(500).send({ 'signInStatus': 'failure', 'err': err });
    }
    if (account != null || account != undefined) {
      console.log("Account found", account)
      //compare password
      bcrypt.compare(req.body.password, account.password, (err, result) => {
        if (result === true) {
          //Create Access Token for a user
          UserAccessToken.remove({ userAccount: account._id }, (err) => {
            if (err) {
              res.status(500).json({ 'signInStatus': 'failure', 'err': err, 'email': req.body.email })
            } else {
              var token = TokenGenerator.generate();
              var accessToken = {
                token: token,
                userAccount: account._id,

              }

              var newtoken = new UserAccessToken(accessToken)
              newtoken.save((err, tokendata) => {
                if (err) {
                  res.status(500).json({ 'signInStatus': 'failure', 'err': err, 'email': req.body.email });
                } else {
                  var tokenObject = { 'token': token, 'userId': account._id }
                  res.status(200).json({ 'signInStatus': 'authorized', 'token': tokenObject })
                }
              })

            }
          })

        } else {
          res.status(500).send({ 'signInStatus': 'failure' });
        }
      })
    }
    else {

      console.log("Account not found")
      res.status(500).send({ 'signInStatus': 'not_authorized', 'err': err });
    }
  });


}

exports.handleSignOutAttempt = (req, res) => {

  console.log("SIGN Out ATTEMPT FROM :", req.body.userId)

  UserAccessToken.find({userAccount:req.body.userId},(err, accessToken)=>{
    if(err){
      res.status(500).send({ 'signOutStatus': 'failure', 'err': err });
    }else if(accessToken!=null){
      console.log('AccessTokens', accessToken)
      
      UserAccessToken.findOneAndRemove({userAccount:req.body.userId},(err, data)=>{
        if(err){
          res.status(500).send({ 'signOutStatus': 'failure', 'err': err });
        }else{
          console.log('logoutData:', data)
          res.status(200).json({ 'signOutStatus': 'success' })
        }
      })

    }
  })


}

exports.handleRegister = (req,res) =>{
  console.log(req)
  console.log('SignupData',req.body);
    console.log("Register ATTEMPT FROM :" , req.body.username)
    Login.findOne({email: req.body.email}, (err, account) => {
      if (err)
      {
         console.log("Error in Server " +account)
        res.status(500).send({'registerStatus':'failure','err':err});
      }
      if(account != null || account != undefined )
      {
        console.log("Account found")
          res.status(200).send({'registerStatus':'existing'});
      }
      else{
          console.log("Account not found, create account")
          let newAccount = new Login(req.body)
          newAccount.save((err, account) => {
            if (err) {
              console.log("failure in creating account",err);
              res.status(200).json({'registerStatus':'failure','err':err});
            }
            else{
              console.log("account created",account);
              res.status(200).json({'registerStatus':'created','err':err});
            }
        });
  
    }
  });
  
  
  }
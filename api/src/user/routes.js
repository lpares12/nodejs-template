const express = require('express');
var router = express.Router();

const createUser = require('./controller/http/create.js');
const authenticateUser = require('./controller/http/authenticate.js');
const validateEmail = require('./controller/http/validateEmail.js');
const generateVerificationToken = require('./controller/http/generateVerificationToken.js');
const requestPasswordChange = require('./controller/http/requestPasswordChange.js');
const passwordChangeValidate = require('./controller/http/passwordChangeValidate.js');
const passwordChange = require('./controller/http/passwordChange.js');
const requestPasswordReset = require('./controller/http/requestPasswordReset.js');

const setUser = require('../middleware/set_user.js');
const requiresLogin = require('../middleware/requires_login.js');
const requiresVerified = require('../middleware/requires_verified.js');
const requiresUnverified = require('../middleware/requires_unverified.js');

router.post('/register', (req, res, next) => {
  createUser.execute(req, function(err, user, token){
    if(err){
      return res.status(400).send(err.message);
    }

    return res.send({user: user, token: token});
  });
})

router.post('/verify/:userId/:tokenId', (req, res, next) => {
  validateEmail.execute(req, function(err){
    if(err){
      return res.status(500).send(err.message);
    }

    return res.send("Email validation successful");
  });
})

router.post('/verify/generate', [requiresLogin, setUser, requiresUnverified], (req, res, next) => {
  generateVerificationToken.execute(req, function(err){
    if(err){
      return res.status(500).send(err.message);
    }

    return res.send("Verification email sent");
  });
})

router.post('/login', (req, res, next) => {
  authenticateUser.execute(req, function(err, user, token){
    if(err){
      return res.status(400).send(err.message);
    }

    return res.send({user: user, token: token});
  });
})

router.post('/logout', requiresLogin, async (req, res, next) => {
  AuthToken = require('../app/domain/user/model/authToken.js');
  try{
    await AuthToken.destroySession(token.auth);
  }catch(err){
    return res.status(500).send(err.message);
  }

  return res.send("Logout successful");
})

router.get('/profile', [requiresLogin, setUser], (req, res, next) => {
  return res.send(req.user);
})

router.post('/password/generate', [requiresLogin, setUser, requiresVerified], (req, res, next) => {
  requestPasswordChange.execute(req, function(err){
    if(err){
      return res.status(500).send(err.message);
    }

    return res.send("Password change link sent to your email");
  });
})

router.get('/password/change/:userId/:token', (req, res, next) => {
  passwordChangeValidate.execute(req, function(err, user){
    if(err){
      return res.status(500).send(err.message);
    }

    return res.send({username: user.username});
  });
})

router.post('/password/change/:userId/:token', (req, res, next) => {
  passwordChange.execute(req, function(err){
    if(err){
      return res.status(500).send(err.message);
    }

    return res.send("Password change successful");
  });
})

router.post('/password/reset', (req, res, next) => {
  requestPasswordReset.execute(req, function(err){
    if(err){
      return res.status(500).send(err.message);
    }

    return res.send('Password reset link sent to your email');
  });
})

module.exports = router;

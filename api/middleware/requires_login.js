AuthToken = require('../app/domain/user/model/authToken.js');

async function requiresLogin(req, res, next) {
  auth = req.headers['auth'];
  if(auth){
    token = await AuthToken.validateSession(auth);
    if(token == null){
      return res.status(401).send();
    }
    req.token = token;
    return next();
  }

  return res.status(401).send();
}

module.exports = requiresLogin;

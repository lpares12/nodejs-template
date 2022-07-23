repository = require('../app/infrastructure/user/repository.js');

async function setUser(req, res, next){
  if(req.token.userId){
    try{
      user = await repository.get(req.token.userId);
    }catch(err){
      return next(err);
    }

    req.user = user;
    return next();
  }

  return res.status(401).send();
}

module.exports = setUser;

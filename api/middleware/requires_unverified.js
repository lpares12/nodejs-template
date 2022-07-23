async function requiresUnverified(req, res, next){
  if(req.user){
    if(!req.user.isVerified){
      return next();
    }

    return res.status(403).send();
  }

  return res.status(401).send();
}

module.exports = requiresUnverified;

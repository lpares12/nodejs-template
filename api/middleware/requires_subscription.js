function requiresSubscription(req, res, next){
  if(req.user){
    var currentDate = new Date();
    if(currentDate < req.user.subscriptionEndDate && req.user.plan != 'none'){
      return next();
    }

    res.status(403).send('Only users with active subscriptions can see this page')
  }

  res.status(401).send('Only users can see this page')
}

module.exports = requiresSubscription;

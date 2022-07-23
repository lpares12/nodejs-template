getCheckout = require('../../commands/getCheckout.js');
getCheckoutHandler = require('../../commands/getCheckoutHandler.js');

module.exports.execute = async function(req, callback){
  try{
    const command = getCheckout(req.user);
    checkoutSession = await getCheckoutHandler(command);
  }catch(err){
    return callback(err);
  }

  return callback(null, checkoutSession.url);
}

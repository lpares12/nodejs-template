repository = require('../repository.js');
emailer = require('../../utils/interfaces/emailer.js');
stripe = require('../../utils/interfaces/stripe.js');

module.exports = async function(commandData){
  try{
    await repository.validateToken(commandData);

    user = await repository.setIsVerified(commandData.userId);

    //TODO: move this to another command and send an event to it
    customer = await stripe.addCustomer(user.username, user.email);
    await repository.setStripeId(user._id, customer.id);

    //Send email, TODO: move to an event
    emailer.sendVerifiedEmail(user);
  }catch(err){
    throw err;
  }

  return user;
}

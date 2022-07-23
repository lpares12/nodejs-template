stripe = require('../../utils/interfaces/stripe.js');

module.exports = async function(commandData){
  try{
    billingManager = await stripe.createBillingSession(commandData);
    return billingManager;
  }catch(err){
    throw err;
  }
}

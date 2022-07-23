processWebhook = require('../../commands/processWebhook.js');
processWebhookHandler = require('../../commands/processWebhookHandler.js');

module.exports.execute = async function(data, callback){
  try{
    //const command = processWebhook(req.body, req.headers['stripe-signature']);
    await processWebhookHandler(data);
  }catch(err){
    console.log(err);
    return callback(err);
  }

  return callback(null);
}

getManager = require('../../commands/getManager.js');
getManagerHandler = require('../../commands/getManagerHandler.js');

module.exports.execute = async function(req, callback){
  //Execute command
  try{
    const command = getManager(req.user);
    billingManager = await getManagerHandler(command);
  }catch(err){
    return callback(err);
  }

  return callback(null, billingManager.url);
}

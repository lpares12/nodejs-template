reqPasswordReset = require('../../commands/reqPasswordReset.js');
reqPasswordResetHandler = require('../../commands/reqPasswordResetHandler.js');

module.exports.execute = async function(req, callback){
  //Execute command
  try{
    const command = reqPasswordReset(req.body.username);
    await reqPasswordResetHandler(command);
  }catch(err){
    return callback(err);
  }

  return callback(null);
}

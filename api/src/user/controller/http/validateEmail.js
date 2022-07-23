validateEmail = require('../../commands/verificateEmail.js');
validateEmailHandler = require('../../commands/verificateEmailHandler.js');

module.exports.execute = async function(req, callback){
  try{
    const command = validateEmail(req.params.userId, req.params.tokenId);
    await validateEmailHandler(command);
  }catch(err){
    return callback(err);
  }

  return callback();
}

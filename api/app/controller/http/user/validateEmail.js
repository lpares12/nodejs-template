validateEmail = require('../../../application/user/verificateEmail.js');
validateEmailHandler = require('../../../application/user/verificateEmailHandler.js');

module.exports.execute = async function(req, callback){
  try{
    const command = validateEmail(req.params.userId, req.params.tokenId);
    await validateEmailHandler(command);
  }catch(err){
    return callback(err);
  }

  return callback();
}

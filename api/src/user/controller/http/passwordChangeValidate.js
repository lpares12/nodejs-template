passwordChangeValidate = require('../../commands/passwordChangeValidate.js');
passwordChangeValidateHandler = require('../../commands/passwordChangeValidateHandler.js');

module.exports.execute = async function(req, callback){
  //Execute command
  try{
    const command = passwordChangeValidate(req.params.userId, req.params.token);
    user = await passwordChangeValidateHandler(command);
  }catch(err){
    return callback(err);
  }

  return callback(null, user);
}

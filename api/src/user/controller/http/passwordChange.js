passwordChange = require('../../commands/passwordChange.js');
passwordChangeHandler = require('../../commands/passwordChangeHandler.js');

module.exports.execute = async function(req, callback){
//Execute command
  try{
    const command = passwordChange(req.params.userId, req.params.token, req.body.pass, req.body.pass2);
    user = await passwordChangeHandler(command);
  }catch(err){
    return callback(err);
  }

  return callback(null, user);
}

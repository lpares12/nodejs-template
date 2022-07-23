reqPasswordChange = require('../../commands/reqPasswordChange.js');
reqPasswordChangeHandler = require('../../commands/reqPasswordChangeHandler.js');

module.exports.execute = async function(req, callback){
  try{
    const command = reqPasswordChange(req.user);
    await reqPasswordChangeHandler(command);
  }catch(err){
    return callback(err);
  }

  return callback(null);
}

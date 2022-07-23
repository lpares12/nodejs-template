reqPasswordChange = require('../../../application/user/reqPasswordChange.js');
reqPasswordChangeHandler = require('../../../application/user/reqPasswordChangeHandler.js');

module.exports.execute = async function(req, callback){
  try{
    const command = reqPasswordChange(req.user);
    await reqPasswordChangeHandler(command);
  }catch(err){
    return callback(err);
  }

  return callback(null);
}

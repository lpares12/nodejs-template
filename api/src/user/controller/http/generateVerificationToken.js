generateToken = require('../../commands/generateToken.js');
generateTokenHandler = require('../../commands/generateTokenHandler.js');

module.exports.execute = async function(req, callback){
  try{
    const command = generateToken(req.token.userId);
    await generateTokenHandler(command);
  }catch(err){
    return callback(err);
  }

  return callback(null);
}

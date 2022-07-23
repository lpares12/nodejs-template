generateToken = require('../../../application/user/generateToken.js');
generateTokenHandler = require('../../../application/user/generateTokenHandler.js');

module.exports.execute = async function(req, callback){
  try{
    const command = generateToken(req.token.userId);
    await generateTokenHandler(command);
  }catch(err){
    return callback(err);
  }

  return callback(null);
}

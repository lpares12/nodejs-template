authenticate = require('../../../application/user/authenticate.js');
authenticateHandler = require('../../../application/user/authenticateHandler.js');

module.exports.execute = async function(req, callback){
  //Execute command
  try{
    const command = authenticate(req.body.user, req.body.pass);
    data = await authenticateHandler(command);
  }catch(err){
    return callback(err);
  }

  return callback(null, data.user, data.authToken);
}

authenticate = require('../../commands/authenticate.js');
authenticateHandler = require('../../commands/authenticateHandler.js');

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

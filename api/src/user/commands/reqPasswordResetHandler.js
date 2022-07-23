repository = require('../repository.js');
emailer = require('../../utils/interfaces/emailer.js');

module.exports = async function(commandData){
  user = await repository.getByNameOrEmail(commandData.username);
  commandData['userId'] = user._id;
  token = await repository.generateToken(commandData);

  try{
    //Send email
    //TODO: Make this as an event and create a command sendPasswordChangeEmail
    //that will be subscribed to those events
    await emailer.sendPasswordChangeEmail(user, token);
  }catch(err){
    throw err;
  }
}

repository = require('../repository.js');
emailer = require('../../utils/interfaces/emailer.js');

module.exports = async function(commandData){
  try{
    token = await repository.generateToken(commandData);

    //Send email
    //TODO: Make this as an event and create a command sendPasswordChangeEmail
    //that will be subscribed to those events
    await emailer.sendPasswordChangeEmail(commandData.user, token);
  }catch(err){
    throw err;
  }
}

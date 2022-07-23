repository = require('../../infrastructure/user/repository.js');

module.exports = async function(commandData){
  await repository.validateToken(commandData);
  user = await repository.updatePassword(commandData);

  try{
    //Send email
    //TODO: Make this as an event and create a command sendPasswordChangedEmail
    //that will be subscribed to those events
    await emailer.sendPasswordChangedEmail(user);
  }catch(err){
    //Ignore error
    console.log(err);
  }

  return user;
}

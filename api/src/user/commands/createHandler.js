repository = require('../repository.js');
emailer = require('../../utils/interfaces/emailer.js');

module.exports = async function(commandData){
  //Call infra
  user = await repository.save(commandData);

  authToken = await repository.createSession(user._id);

  try{
    token = await repository.generateToken({userId: user._id, type: 'emailValidation'});

    //Send email
    //TODO: Make this as an event and create a command sendVerificationEmail
    //that will be subscribed to those events
    await emailer.sendVerificationEmail(user, token);
  }catch(err){
    //Fail silently, we do not care
    console.log(err);
  }

  return {user: user, token: authToken.auth};
}

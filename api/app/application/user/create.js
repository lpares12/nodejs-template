module.exports = function(username, email, password){
  if(!username || !email || !password){
    throw new Error('All fields must be filled');
  }

  //Add days of trial
  var trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + parseInt(process.env.TRIAL_DAYS));

  return {
    'username': username,
    'email': email,
    'password': password,
    'subscriptionEndDate': trialEndDate,
  }
}

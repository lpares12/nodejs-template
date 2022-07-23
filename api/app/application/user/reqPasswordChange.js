module.exports = function(user){
  if(!user._id){
    throw new Error('UserId can not be empty');
  }

  return {
    'user': user,
    'userId': user._id,
    'type': 'passwordReset',
  }
}

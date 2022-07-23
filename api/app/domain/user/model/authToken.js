const mongoose = require('mongoose');
const crypto = require('crypto');

const AuthTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  auth: { type: String, required: true},
  //This field will tell us when the token was created and will remove the token after 3600 seconds (1 month)
  createdAt: { type: Date, required: true, default: Date.now, expires: 3600*24*30},
});

AuthTokenSchema.statics.createSession = async function(userId){
  const auth = crypto.randomBytes(32).toString('hex');
  const newToken = new this({
    userId: userId,
    auth: auth,
  });

  return await newToken.save();
}

AuthTokenSchema.statics.destroySession = async function(auth){
  await AuthToken.deleteOne({auth: auth});
}

AuthTokenSchema.statics.validateSession = async function(auth){
  token = await AuthToken.findOne({auth: auth});
  if(!token){
    return null;
  }else{
    return token;
  }
}

const AuthToken = mongoose.model('AuthToken', AuthTokenSchema);
module.exports = AuthToken;

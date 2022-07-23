repository = require('../../infrastructure/user/repository.js');

module.exports = async function(commandData){
  return await repository.authenticate(commandData);
}

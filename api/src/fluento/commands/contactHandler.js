emailer = require('../../utils/interfaces/emailer.js');

module.exports = async function(commandData){
  //Send email
  await emailer.sendContactEmail(commandData);
}

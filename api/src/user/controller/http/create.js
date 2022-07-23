create = require('../../commands/create.js');
createHandler = require('../../commands/createHandler.js');

module.exports.execute = async function(req, callback){
	//Execute command
	try{
		const command = create(req.body.user, req.body.email, req.body.pass);
		data = await createHandler(command);
	}catch(err){
		return callback(err);
	}

	return callback(null, data.user, data.token);
}

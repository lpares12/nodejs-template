create = require('../../../application/user/create.js');
createHandler = require('../../../application/user/createHandler.js');

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

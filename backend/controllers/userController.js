const User = require('../models/userModel');

async function CreateUser(req, res) {
	try {
		// http request body에 {user_id, user_pw, user_name} 세가지 parameter를 받음.
		const { user_id, user_pw, user_name } = req.body;

		await User.create(user_id, user_pw, user_name);
		res.status(201).json({ result: true });
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: err });
	}
}

async function DeleteUser(req, res) {
	try {
		// http body에 {user_id} 한가지 parameter를 받음.
		const { user_id } = req.body;

		await User.delete(user_id);
		res.status(201).json({result: true});
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: err });
	}
}

module.exports = {
	createUser: CreateUser,
	deleteUser: DeleteUser,
}
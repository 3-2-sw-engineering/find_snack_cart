const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const SecretKey = process.env.SECRET_KEY;

async function CreateUser(req, res) {
	try {
		// http request body에 {user_id, user_pw, user_name} 세가지 parameter를 받음.
		const { user_id, user_pw, user_name, user_email } = req.body;

		await User.create(user_id, user_pw, user_name, user_email);
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
		res.status(201).json({ result: true });
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: err });
	}
}

async function GetUserInfo(req, res) {
	try {
		const { user_id } = req.params;

		const user = await User.findUserById(user_id);
		if (user) {
			res.status(200).json({ user: user });
		} else {
			throw "not exist user";
		}
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: err });
	}
}

async function ChangePassword(req, res) {
	try {
		const { user_id, current_pw, change_pw } = req.body;

		await User.changePw(user_id, current_pw, change_pw);
		res.status(201).json({ result: true });
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: err });
	}
}

async function Login(req, res) {
	try {
		const { user_id, user_pw } = req.body;

		const user = await User.loginCheck(user_id, user_pw);
		if (user === null) {
			throw "id doesn't exist."
		} else if (user === false) {
			throw "password isn't correct."
		} else {
			const token = jwt.sign({
				user_id: user.user_id
			}, SecretKey, {
				expiresIn: '1h'
			});
			res.cookie('user', token, { sameSite: 'none', secure: true });
			res.status(201).json({result: true});
		}
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: err });
	}

}

module.exports = {
	createUser: CreateUser,
	deleteUser: DeleteUser,
	getUserInfo: GetUserInfo,
	changePassword: ChangePassword,
	login: Login,
}
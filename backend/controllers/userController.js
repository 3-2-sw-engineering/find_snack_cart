const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const SecretKey = process.env.SECRET_KEY;

async function CreateUser(req, res) {
	try {
		// http request body에 {user_id, user_pw, user_name} 세가지 parameter를 받음.
		const { user_id, user_pw, user_name, user_email } = req.body;

		if (user_id === undefined || user_pw === undefined ||
			user_name === undefined || user_email === undefined) {
			res.status(400).json({error: "At least one parameter is not valid. The body was: " + JSON.stringify(req.body)});
		}

		await User.create(user_id, user_pw, user_name, user_email);
		res.status(201).json({ result: true });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	}
}

async function DeleteUser(req, res) {
	try {
		// http body에 {user_id} 한가지 parameter를 받음.
		const { user_id } = req.body;

		if (user_id === undefined) {
            res.status(400).json({error: "user_id is required. The body was: " + JSON.stringify(req.body)});
            return;
        }

		await User.delete(user_id);
		res.status(201).json({ result: true });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	}
}

async function GetUserInfo(req, res) {
	try {
		const { user_id } = req.params;

		if (user_id === undefined) {
            res.status(400).json({error: "user_id is required. The params were: " + JSON.stringify(req.params)});
            return;
        }

		const user = await User.findUserById(user_id);
		if (user) {
			res.status(200).json({ user: user });
		} else {
			res.status(404).json({ error: `user with id ${user_id} is not found.` });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	}
}

async function ChangePassword(req, res) {
	try {
		const { user_id, current_pw, change_pw } = req.body;

		if (user_id === undefined || current_pw === undefined || change_pw === undefined) {
			res.status(400).json({error: "At least one parameter is not valid. The body was: " + JSON.stringify(req.body)});
		}

		const user = await User.loginCheck(user_id, current_pw);
		console.log(user);

		if (user === null) {
			res.status(404).json({ error: "id doesn't exist." });
		} else if (user === false) {
			res.status(401).json({ error: "password isn't correct." });
		} else {
			User.changePw(user_id, change_pw);
			res.status(201).json({ result: true });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	}
}

async function Login(req, res) {
	try {
		const { user_id, user_pw } = req.body;

		if (user_id === undefined || user_pw === undefined) {
			res.status(400).json({error: "At least one parameter is not valid. The body was: " + JSON.stringify(req.body)});
		}

		const user = await User.loginCheck(user_id, user_pw);

		if (user === null) {
			res.status(404).json({ error: "id doesn't exist." });
		} else if (user === false) {
			res.status(401).json({ error: "password isn't correct." });
		} else {
			const token = jwt.sign({
				user_id: user.user_id
			}, SecretKey, {
				expiresIn: '1h'
			});
			res.cookie('user', token, { sameSite: 'none', secure: true });
			res.status(201).json({ result: true });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	}
}

async function LogOut(req, res) {
	try {
		res.cookie("user", "", { sameSite: 'none', secure: true });
		res.status(201).json({ result: true });
	} catch (err) {
		res.status(500).json({ error: err });
	}
}

async function AddFavorite(req, res) {
	try {
		const { user_id, market_id } = req.body;

		if (user_id === undefined || market_id === undefined) {
			res.status(400).json({error: "At least one parameter is not valid. The body was: " + JSON.stringify(req.body)});
		}

		await User.addFavor(user_id, market_id);
		res.status(201).json({ result: true });
	} catch (err) {
		res.status(500).json({ error: err })
	}
}

async function RemoveFavorite(req, res) {
	try {
		const { user_id, market_id } = req.body;

		if (user_id === undefined || market_id === undefined) {
			res.status(400).json({error: "At least one parameter is not valid. The body was: " + JSON.stringify(req.body)});
		}

		await User.removeFavor(user_id, market_id);
		res.status(201).json({ result: true });
	} catch (err) {
		res.status(500).json({ error: err })
	}
}


module.exports = {
	createUser: CreateUser,
	deleteUser: DeleteUser,
	getUserInfo: GetUserInfo,
	changePassword: ChangePassword,
	login: Login,
	logout: LogOut,
	addFavorite: AddFavorite,
	removeFavorite: RemoveFavorite,
}
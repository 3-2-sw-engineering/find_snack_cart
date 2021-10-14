const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var User = new Schema({
	user_id: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	user_pw: {
		type: String,
		required: true,
		trim: true,
	},
	user_name: {
		type: String,
		required: true,
		trim: true,
	},
	user_email: {
		type: String,
		require: true,
		trim: true,
		unique: true,
	},
	favorite: {
		type: [String],
	}
});

User.statics.create = async function (user_id, user_pw, user_name) {
	const find_user = await this.findOne({ "user_id": user_id });
	if (find_user) {
		throw 'already user exists';
	}

	const user = new this({
		user_id: user_id,
		user_pw: user_pw,
		user_name: user_name,
	});

	console.log('user 생성: ' + user_id);

	return user.save()
}

User.statics.delete = async function (user_id) {
	const user = await this.findOne({ "user_id": user_id });

	if (user) {
		return this.findOneAndDelete({ "user_id": user_id });
	} else {
		throw 'not exist user';
	}
}

User.statics.findUserById = async function (user_id) {
	const user = await this.findOne({ "user_id": user_id });

	if (user) {
		return user;
	} else {
		throw "not exist user";
	}
}

User.statics.changePw = async function (user_id, current_pw, change_pw) {
	const user = await this.findOne({ "user_id": user_id });

	if (user) {
		// 비밀번호 관리 라이브러리 필요. bcrypt로 추후 변경 예정.
		if (user.user_pw !== current_pw) { throw "wrong password" };

		this.findOneAndUpdate({ "user_id": user_id }, {
			$set: {
				user_pw: change_pw
			}
		}, { new: true, useFindAndModify: false }, (err, doc) => {
			if (err) {
				throw err;
			}
		})
	} else {
		throw "not exist user";
	}
}


module.exports = mongoose.model('users', User);
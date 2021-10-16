const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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
		required: true,
		trim: true,
		unique: true,
	},
	favorite: {
		type: [String],
	},
	role: {
		type: Number,
		required: true,
		default: 0,
	},
	salt: {
		type: Number,
		required: true,
	}
});

User.pre("save", function(next){
	var user = this;
	bcrypt.genSalt(user.salt, (err, salt) => {
		if(err) throw err;
		bcrypt.hash(user.user_pw, salt, (err, hash) => {
			if(err) throw err;
			user.user_pw = hash;
			next();
		});
	});
})

User.statics.create = async function (user_id, user_pw, user_name, user_email, role) {
	const find_user = await this.findOne({ "user_id": user_id });
	if (find_user) {
		throw 'already user exists';
	}

	const saltRound = Math.floor(Math.random() * 10) + 1;

	const user = new this({
		user_id: user_id,
		user_pw: user_pw,
		user_name: user_name,
		user_email: user_email,
		favorite: [],
		role: role,
		salt: saltRound
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
		// 비밀번호 확인
		const result = await bcrypt.compare(current_pw, user.user_pw);

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
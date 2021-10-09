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
	}
});

User.statics.create = async function (user_id, user_pw, user_name) {
	const find_user = await this.findOne({ "user_id": user_id });
	if (find_user) {
		throw 'user exists';
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
		throw 'user not exist';
	}
}


module.exports = mongoose.model('users', User);
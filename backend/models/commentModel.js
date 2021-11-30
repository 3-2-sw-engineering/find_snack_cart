const mongoose = require('mongoose');
const Increment = require('./incrementModel');
const Schema = mongoose.Schema;
const markets = require('./marketModel');
const users = require('./userModel');

var Comment = new Schema({
    _id: Schema.Types.ObjectId,

    comment_id: {
        type: Number,
        required: true,
        unique: true,
    },
    comment_review: {
        type: String,
    },
    comment_score: {
        type: Number,
    },
    comment_reviewer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    comment_time: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    comment_target: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "markets"
    },
});

Comment.pre('save', async function(next) {
    if (this.isNew) {
        const max = await Increment.getNext('Comment');
        this.comment_id = max;
        next();
    } else {
        next();
    }
});

Comment.statics.create = async function (comment_review, comment_score, comment_reviewer, comment_time, comment_target){  
    const comment = new this({
        _id: new mongoose.Types.ObjectId(),
        comment_id: 0, // save pre hook에서 설정될 예정이므로 dummy 값 저장.
        comment_review: comment_review,
        comment_score: comment_score,
        comment_reviewer: comment_reviewer,
        comment_time: comment_time,
        comment_target: comment_target,
    });

    const user = await users.findOne({'_id' : comment_reviewer})
    if(!user) {
        throw new Error('user not exists');
    }

    const market = await markets.findOne({'_id' : comment_target})
    if(!market) {
        throw new Error('market not exists');
    }

    return comment.save()
}

Comment.statics.delete = async function (comment_id) {
    const comment = await this.findOne({"comment_id": comment_id});

    if(comment) {
        return this.findOneAndDelete({"comment_id": comment_id});
    }
    else {
        throw new Error('comment not exists');
    }
}

Comment.statics.edit = async function (comment_id, change_review, change_score) {
    const comment = await this.findOne({"comment_id": comment_id});

    this.findOneAndUpdate({"comment_id": comment_id}, {
        $set: {
            comment_review: change_review,
            comment_score: change_score,
        }
    }, {new: true, useFindAndModify: false}, (err, doc) => {
        if (err) {
            throw err;
        }
    })
}

Comment.statics.findCommentById = async function (comment_id) {
    return await this.findOne({"comment_id": comment_id});
}

module.exports = mongoose.model('comments', Comment);

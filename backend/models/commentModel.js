const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Comment = new Schema({
    _id: Schema.Types.ObjectId,

    comment_id: {
        type: Number,
      //  required: true,
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
        ref: "user",
    },
    comment_time: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    comment_target: {
        type: Schema.Types.ObjectId,
        ref: "market"
    },
});


Comment.statics.create = async function (comment_id, comment_review, comment_score, comment_reviewer, comment_time, comment_target){  
    const comment = new this({
        _id: new mongoose.Types.ObjectId(),
        comment_id: comment_id,
        comment_review: comment_review,
        comment_score: comment_score,
        comment_reviewer: comment_reviewer,
        comment_time: comment_time,
        comment_target: comment_target,
    });


    console.log('코멘트 작성: ' + comment_id);

    return comment.save()
}

Comment.statics.delete = async function (comment_id) {
    const comment = await this.findOne({"comment_id": comment_id});

    if(comment) {
        return this.findOneAndDelete({"comment_id": comment_id});
    }
    else {
        throw 'comment not exists';
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
    const comment = await this.findOne({"comment_id": comment_id});

    if(comment) {
        return comment;
    } else {
        throw "comment not exists"
    }
}



module.exports = mongoose.model('comments', Comment);
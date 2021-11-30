const Comment = require('../models/commentModel');

async function CreateComment(req, res) {
    try {
        const {
            comment_id, comment_review, comment_score,
            comment_reviewer, comment_time, comment_target
        } = req.body;

        if (comment_id === undefined || comment_review === undefined || 
            comment_score === undefined || comment_reviewer === undefined || 
            comment_time === undefined || comment_target === undefined) {
            res.status(400).json({error: "At least one parameter is not valid. The body was: " + JSON.stringify(req.body)});
        }

        await Comment.create(comment_id, comment_review, comment_score, comment_reviewer, comment_time, comment_target);
        res.status(201).json({result: true});
    } catch (err) { 
        console.log(err);
        res.status(500).json({error: err});
    }
}

async function DeleteComment(req, res) {
    try {
        const {comment_id} = req.body;

        if (comment_id === undefined) {
            res.status(400).json({error: "comment_id is not valid. The body was: " + JSON.stringify(req.body)});
        }

        await Comment.delete(comment_id);
        res.status(200).json({result: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
}

async function GetCommentInfo(req, res) {
    try {
        const {comment_id} = req.params;
        const comment = await Comment.findCommentById(comment_id);
        if(comment) {
        res.status(200).json({comment: comment});
        } else {
            throw "comment not exists"
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({error: err});
    }
}

async function EditComment(req, res) {
    try {
        const {comment_id, comment_review, comment_score, comment_time} = req.body;

        await Comment.edit(comment_id, comment_review, comment_score, comment_time);
        res.status(201).json({result: true});
    } catch (err) {
        console.log(err);
        res.status(401).json({error:err});
    }
}

module.exports = {
    createComment: CreateComment,
    deleteComment: DeleteComment,
    getCommentInfo: GetCommentInfo,
    editComment: EditComment
}

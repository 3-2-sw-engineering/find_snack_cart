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
            return;
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
            res.status(400).json({error: "comment_id is required. The body was: " + JSON.stringify(req.body)});
            return;
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

        if (comment_id === undefined) {
            res.status(400).json({error: "comment_id is required. The params were: " + JSON.stringify(req.params)});
            return;
        }

        const comment = await Comment.findCommentById(comment_id);
        if (comment) {
            res.status(200).json({comment: comment});
        } else {
            res.status(404).json({error: `comment with id ${comment_id} is not found.`});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
}

async function EditComment(req, res) {
    try {
        const {comment_id, comment_review, comment_score, comment_time} = req.body;

        if (comment_id === undefined || comment_review === undefined || 
            comment_score === undefined || comment_time === undefined) {
            res.status(400).json({error: "At least one parameter is not valid. The body was: " + JSON.stringify(req.body)});
            return;
        }

        await Comment.edit(comment_id, comment_review, comment_score, comment_time);
        res.status(201).json({result: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({error:err});
    }
}

module.exports = {
    createComment: CreateComment,
    deleteComment: DeleteComment,
    getCommentInfo: GetCommentInfo,
    editComment: EditComment
}

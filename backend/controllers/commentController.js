const Comment = require('../models/commentModel');

async function CreateComment(req, res) {
    try {
        const { comment_id, comment_review, comment_score, comment_reviewer, comment_time, comment_target} = req.body;

        await Comment.create(comment_id, comment_review, comment_score, comment_reviewer, comment_time, comment_target);
        res.status(201).json({reault: true});
    } catch (err) { 
        console.log(err);
        res.status(401).json({error: err});
    }
}

async function DeleteComment(req, res) {
    try {
        const {comment_id} = req.body;

        await Comment.delete(comment_id);
        res.status(201).json({result: true});
        } catch (err) {
            console.log(err);
            res.status(401).json({error: err});
        }
}

async function GetComment(req, res) {
    try {
        res.status(200).json({result: "comment"});
    } catch (err) {
        console.log(err);
        res.status(401).json({error: err});
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
    getComment: GetComment,
    getCommentInfo: GetCommentInfo,
    editComment: EditComment
}
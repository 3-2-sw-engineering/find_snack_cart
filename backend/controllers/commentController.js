const Comment = require('../models/commentModel');
const CookieManager = require("../shared/cookieManager");

async function GetCommentsByMarketIdx(req, res) {
    try {
        const {market_index} = req.params;

        if (market_index === undefined) {
            res.status(400).json({error: "market_index is required. The params were: " + JSON.stringify(req.params)});
            return;
        }

        res.status(200).json({comments: (await Comment.find({comment_target: market_index}))});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
}

async function CreateComment(req, res) {
    try {
        const {
            comment_review, comment_score,
            comment_reviewer, comment_time, comment_target
        } = req.body;

        if (comment_review === undefined || 
            comment_score === undefined || comment_reviewer === undefined || 
            comment_time === undefined || comment_target === undefined) {
            res.status(400).json({error: "At least one parameter is not valid. The body was: " + JSON.stringify(req.body)});
            return;
        }

        const current = CookieManager.checkCurrentSession(req, res);
        // 현재 로그인이 되어있는지 확인.
		// 로그인 사용자와 댓글 작성자의 reviewer 정보가 다르면 에러 반환.
        if (current === undefined || current !== comment_reviewer) {
            res.status(401).json({ error: "Unauthorized access. Log in with the appropriate account." });
            return;
        }
		
        await Comment.create(comment_review, comment_score, comment_reviewer, comment_time, comment_target);
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

        const comment = await Comment.findCommentById(comment_id);
        if (comment === null) {
            res.status(404).json({error: "comment with id ${comment_id} is not found."});
            return;
        }

        const current = CookieManager.checkCurrentSession(req, res);
        // 현재 로그인이 되어있는지 확인.
		// 로그인 사용자와 댓글 작성자의 reviewer 정보가 다르면 에러 반환.
        if (current === undefined || current !== comment.comment_reviewer) {
            res.status(401).json({ error: "Unauthorized access. Log in with the appropriate account." });
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

		const comment = await this.findOne({"comment_id": comment_id});
		if (comment === null) {
            res.status(404).json({error: "comment with id ${comment_id} is not found."});
            return;
        }
		
        const current = CookieManager.checkCurrentSession(req, res);
        // 현재 로그인이 되어있는지 확인.
		// 로그인 사용자와 댓글 작성자의 reviewer 정보가 다르면 에러 반환.
        if (current === undefined || current !== comment.comment_reviewer) {
            res.status(401).json({ error: "Unauthorized access. Log in with the appropriate account." });
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
    getCommentsByMarketIdx: GetCommentsByMarketIdx,
    createComment: CreateComment,
    deleteComment: DeleteComment,
    getCommentInfo: GetCommentInfo,
    editComment: EditComment
}

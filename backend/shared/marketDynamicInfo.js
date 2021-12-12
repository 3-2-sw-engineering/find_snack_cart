const Comment = require('../models/commentModel');
const Market = require('../models/marketModel');

// 평점, 리뷰 수 등은 동적으로 계산
async function getDynamicInfo(market) {
    const comments = await Comment.find({comment_target: market.market_index});
    let ratAcc = 0.0;
    comments.forEach(c => {
        ratAcc += c.comment_score;
    });
    
    const augmented = market.toObject();
    augmented.market_rating = comments.length ? ratAcc / comments.length : 0;
    augmented.market_comments_count = comments.length;
    return augmented;
}

module.exports = getDynamicInfo;
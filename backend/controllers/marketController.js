const Market = require('../models/marketModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');
const CookieManager = require("../shared/cookieManager");

// 평점, 리뷰 수 등은 동적으로 계산
async function getDynamicInfo(market) {
    const comments = await Comment.find({comment_target: market.market_index});
    let ratAcc = 0.0;
    comments.forEach(c => {
        ratAcc += c.comment_score;
    });
    
    market.market_rating = comments.length ? ratAcc / comments.length : 0;
    market.market_comments_count = comments.length;
    return market;
}

async function GetAllMarkets(req, res) {
    try {
        const markets = await Market.find();
        const promises = markets.map(market => getDynamicInfo(market));
        const augmented = await Promise.all(promises);

        res.status(201).json({markets: augmented});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
}

async function CreateMarket(req, res) {
    // Note: 이 API는 로그인 해야 사용할 수 있으므로, 따로 market_owner를 받을 필요가 없고
    // 쿠키를 조회해서 ID를 알아낼 수 있음. (생성 후 Owner 수정 불가)
    try {
        const {
            market_title, market_location, market_food,
            market_category, market_payment_method, market_explanation,
            market_image, market_authority, market_fixed,
            market_phone_number
        } = req.body;

        if (market_title === undefined || market_location === undefined || market_food === undefined ||
            market_category === undefined || market_payment_method === undefined || market_food === undefined ||
            market_image === undefined || market_authority === undefined || market_fixed === undefined ||
            market_phone_number === undefined) {
            res.status(400).json({error: "At least one parameter is not valid. The body was: " + JSON.stringify(req.body)});
            return;
        }

        const current = CookieManager.checkCurrentSession(req, res);
        // 현재 로그인이 되어있는지 확인.
        if (current === undefined) {
            res.status(401).json({ error: "Unauthorized access. Log in with the appropriate account." });
            return;
        }

        // 1이면 직접 등록이고, 0이면 제보
        if (market_authority) {
            // 현재 로그인한 계정으로 owner 등록
            const created = await Market.create(market_title, market_location, market_food, market_category, market_payment_method, market_explanation, market_image, market_authority, market_fixed, market_phone_number, current);
            User.findOneAndUpdate({"user_id": current}, {
                $set: {
                    managing: created.market_index
                }
            }).exec();
        } else {
            // owner를 알 수 없으므로 owner를 null로 설정
            await Market.create(market_title, market_location, market_food, market_category, market_payment_method, market_explanation, market_image, market_authority, market_fixed, market_phone_number, null);
        }
        res.status(201).json({ result: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
}

async function DeleteMarket(req, res) {
    try {
        const {market_index} = req.params;

        if (market_index === undefined) {
            res.status(400).json({error: "market_index is required. The body was: " + JSON.stringify(req.body)});
            return;
        }

        const current = CookieManager.checkCurrentSession(req, res);
        // 현재 로그인이 되어있는지 확인.
        if (current === undefined) {
            res.status(401).json({ error: "Unauthorized access. Log in with the appropriate account." });
            return;
        }

        if (await User.find({"managing": market_index}).limit(1).size()) {
            User.findOneAndUpdate({"managing": market_index}, {
                $set: {
                    managing: null
                }
            }).exec();
        }

        await Market.delete(market_index);
        res.status(201).json({result: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
}

async function EditMarket(req, res) {
    try {
        const {
            market_index, market_title, market_location, market_food,
            market_category, market_payment_method, market_explanation,
            market_image, market_authority, market_fixed,
            market_phone_number
        } = req.body;

        if (market_title === undefined || market_index === undefined || market_location === undefined || market_food === undefined ||
            market_category === undefined || market_payment_method === undefined || market_food === undefined ||
            market_image === undefined || market_authority === undefined || market_fixed === undefined ||
            market_phone_number === undefined) {
            res.status(400).json({error: "At least one parameter is not valid. The body was: " + JSON.stringify(req.body)});
            return;
        }

        const current = CookieManager.checkCurrentSession(req, res);
        // 현재 로그인이 되어있는지 확인.
        if (current === undefined) {
            res.status(401).json({ error: "Unauthorized access. Log in with the appropriate account." });
            return;
        }

        await Market.edit(market_index, market_title, market_location, market_food, market_category, market_payment_method, market_explanation, market_image, market_authority, market_fixed, market_phone_number);
        res.status(201).json({result:true});
    } catch (err) {
        console.log(err);
        res.status(500).json({error:err});
    }
}

async function GetMarketInfo(req, res) {
	try {
		const {market_index} = req.params;

        if (market_index === undefined) {
            res.status(400).json({error: "market_index is required. The params were: " + JSON.stringify(req.params)});
            return;
        }
		
        const market = await Market.findMarketByIndex(market_index);
        if (market) {
            res.status(200).json({market: await getDynamicInfo(market)});
        } else {
            res.status(404).json({error: `market with index ${market_index} is not found.`});
        }

	} catch (err) {
		console.log(err);
		res.status(500).json({error: err});
	}
}

module.exports = {
    getAllMarkets: GetAllMarkets,
    createMarket: CreateMarket,
    deleteMarket: DeleteMarket,
    editMarket: EditMarket,
    getMarketInfo: GetMarketInfo
}
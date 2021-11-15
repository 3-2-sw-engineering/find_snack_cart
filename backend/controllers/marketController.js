const Market = require('../models/marketModel');

async function CreateMarket(req, res) {
    try {
        const { market_index, market_location, market_food, market_category, market_payment_method, market_explanation, market_image, market_authority, market_fixed, market_phone_number} = req.body;

        await Market.create(market_index, market_location, market_food, market_category, market_payment_method, market_explanation, market_image, market_authority, market_fixed, market_phone_number);
        res.status(201).json({ result: true });
    } catch (err) {
        console.log(err);
        res.status(401).json({error: err});
    }
}

async function DeleteMarket(req, res) {
    try {
        const {market_index } = req.body;

        await Market.delete(market_index);
        res.status(201).json({result: true});
    } catch (err) {
        console.log(err);
        res.status(401).json({error: err});
    }
}

async function EditMarket(req, res) {
    try {
        const { market_index, market_location, market_food, market_category, market_payment_method, market_explanation, market_image, market_authority, market_fixed, market_phone_number} = req.body;

        await Market.edit(market_index, market_location, market_food, market_category, market_payment_method, market_explanation, market_image, market_authority, market_fixed, market_phone_number);
        res.status(201).json({result:true});
    } catch (err) {
        console.log(err);
        res.status(401).json({error:err});
    }
}

async function GetMarket(req, res) {
	try {
		res.status(200).json({result: "market"});
	} catch (err) {
		console.log(err);
		res.status(401).json({error: err});
	}
}

async function GetMarketInfo(req, res) {
	try {
		const {market_index} = req.params;
		
        const market = await Market.findMarketByIndex(market_index);
        if(market) {
		res.status(200).json({market: market});
        } else {
            throw "market not exists";
        }

	} catch (err) {
		console.log(err);
		res.status(401).json({error: err});
	}
}

module.exports = {
    createMarket: CreateMarket,
    deleteMarket: DeleteMarket,
    editMarket: EditMarket,
    getMarket: GetMarket,
    getMarketInfo: GetMarketInfo,
}
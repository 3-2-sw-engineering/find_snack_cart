const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Market = new Schema({
    _id: Schema.Types.ObjectId,

    market_index: {
        type: Number,
        required: true,
        unique: true,
    },
    market_location: {
        type: String,
        required: true,
    },
    market_food: {
        type: [String],
    },
    market_category: {
        type: String,
        required: true,
    },
    market_payment_method: {
        type: [String],
    },
    market_explanation: {
        type: String,
        default: '아직 설명이 없습니다.'
    },
    market_image: {
        type: [String],
    },
    //권한 {사용자:0, 사장님:1}
    market_authority: {
        type: Number,
        required: true,
    },
    //{이동형:0, 고정형:1}
    market_fixed: {
        type: Number,
        required: true,
    },
    market_phone_number: {
        type: Number,
    }
});

Market.statics.findMarketByIndex = async function (market_index) {
    const market = await this.findOne({"market_index": market_index});

    if(market) {
        return market;
    } else {
        throw new Error("market not exists");
    }
}

Market.statics.create = async function (market_index, market_location, market_food, market_category, market_payment_method, market_explanation, market_image, market_authority, market_fixed, market_phone_number){
    const find_market = await this.findOne({ "market_index": market_index});
    if(find_market) {
        throw new Error('market exists');
    }

    const market = new this({
        _id: new mongoose.Types.ObjectId(),
        market_index: market_index,
        market_location: market_location,
        market_food: market_food,
        market_category: market_category,
        market_payment_method: market_payment_method,
        market_explanation: market_explanation,
        market_image: market_image,
        market_authority: market_authority,
        market_fixed: market_fixed,
        market_phone_number: market_phone_number,
    });

    console.log('market 생성: ' + market_index);

    return market.save()
}

Market.statics.delete = async function (market_index) {
    const market = await this.findOne({ "market_index": market_index});

    if(market) {
        return this.findOneAndDelete({ "market_index": market_index});
    } 
    else {
        throw new Error('market not exists');
    }
}

Market.statics.edit = async function (market_index, change_location, change_food, change_category, change_payment_method, change_explanation, change_image, change_authority, change_fixed, change_phone_number) {
    const market = await this.findOne({"market_index": market_index});

    this.findOneAndUpdate({"market_index": market_index}, {
        $set: {
            market_location: change_location,
            market_food: change_food,
            market_category: change_category,
            market_payment_method: change_payment_method,
            market_explanation: change_explanation,
            market_image: change_image,
            market_authority: change_authority,
            market_fixed: change_fixed,
            market_phone_number: change_phone_number,
    }
}, {new: true, useFindAndModify: false}, (err, doc) => {
    if(err) {
        throw err;
    }
})
}

module.exports = mongoose.model('markets', Market);



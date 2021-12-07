const mongoose = require('mongoose');
const Increment = require('./incrementModel');
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
        type: String,
    },
    market_owner: {
        type: String,
    }
});

Market.pre('save', async function(next) {
    if (this.isNew) {
        const max = await Increment.getNext('Market');
        this.market_index = max;
        next();
    } else {
        next();
    }
});

Market.statics.findMarketByIndex = async function (market_index) {
    return await this.findOne({"market_index": market_index});
}

Market.statics.create = async function (market_location, market_food, market_category, market_payment_method, market_explanation, market_image, market_authority, market_fixed, market_phone_number, market_owner){
    const market = new this({
        _id: new mongoose.Types.ObjectId(),
        market_index: 0, // save pre hook에서 설정될 예정이므로 dummy 값 저장.
        market_location: market_location,
        market_food: market_food,
        market_category: market_category,
        market_payment_method: market_payment_method,
        market_explanation: market_explanation,
        market_image: market_image,
        market_authority: market_authority,
        market_fixed: market_fixed,
        market_phone_number: market_phone_number,
        market_owner: market_owner,
    });

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

    if (market) {
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
                market_owner: market_owner,
            }
        }, {new: true, useFindAndModify: false}, (err, doc) => {
            if(err) {
                throw err;
            }
        })
    } else {
        throw new Error('market not exists');
    }
}

module.exports = mongoose.model('markets', Market);
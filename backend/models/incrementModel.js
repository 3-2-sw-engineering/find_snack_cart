const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IncrementSchema = new Schema({
    model: {
        type: String,
        required: true,
        index: { 
            unique: true
        }
    },
    index: {
        type: Number,
        default: 0
    }
});

IncrementSchema.statics.getNext = async function(modelName) {
    let max = await this.findOne({ model: modelName });

    if (!max) {
        max = await (new this({ model: modelName })).save();
    }
    max.index++;
    max.save();
    return max.index;
}

module.exports = mongoose.model('increment', IncrementSchema);
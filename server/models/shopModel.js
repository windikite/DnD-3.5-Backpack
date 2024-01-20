const mongoose = require(`mongoose`);
const ObjectId = mongoose.Schema.Types.ObjectId;

const shopSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            unique: true,
            required: true
        },
        type:{
            type: String,
            required: true
        },
        location:{
            type: String,
            required: true
        },
        currentCash:{
            type: Number,
            required: true
        },
        maxItemValue:{
            type: Number,
            required: true
        },
        maxLevel:{
            type: Number,
            required: true
        },
        maxWeight:{
            type: Number,
            required: true
        },
        currentWeight:{
            type: Number
        },
        canIdentify:{
            type: Boolean,
            required: true
        },
        dc:{
            type: Number,
            required: true
        },
        items: {
            type: [{
                type: ObjectId,
                ref: "item"
            }]
        }
        
    },
    {
        timestamps: true
    }
)

const Shop = mongoose.model(`Shop`, shopSchema);

module.exports = Shop;
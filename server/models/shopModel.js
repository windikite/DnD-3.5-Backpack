const mongoose = require(`mongoose`);
const ObjectId = mongoose.Schema.Types.ObjectId;

const shopSchema = new mongoose.Schema(
    {
        Name:{
            type: String,
            unique: true,
            required: true
        },
        Type:{
            type: String,
            required: true
        },
        Location:{
            type: String,
            required: true
        },
        CurrentCash:{
            type: Number,
            required: true
        },
        MaxItemValue:{
            type: Number,
            required: true
        },
        MaxLevel:{
            type: Number,
            required: true
        },
        MaxWeight:{
            type: Number,
            required: true
        },
        CurrentWeight:{
            type: Number
        },
        CanIdentify:{
            type: Boolean,
            required: true
        },
        DC:{
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
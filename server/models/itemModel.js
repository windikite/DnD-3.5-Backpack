const mongoose = require(`mongoose`);

const itemSchema = new mongoose.Schema(
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
        slot:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        source:{
            type: String,
            required: true
        },
        itemLevel:{
            type: Number
        },
        casterLevel:{
            type: Number
        },
        aura:{
            type: String
        },
        activation:{
            type: String
        },
        weight:{
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
)

const Item = mongoose.model(`Item`, itemSchema);

module.exports = Item;
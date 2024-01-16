const mongoose = require(`mongoose`);

const itemSchema = new mongoose.Schema(
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
        Slot:{
            type: String,
            required: true
        },
        Price:{
            type: Number,
            required: true
        },
        Source:{
            type: String,
            required: true
        },
        ItemLevel:{
            type: Number
        },
        CasterLevel:{
            type: Number
        },
        Aura:{
            type: String
        },
        Activation:{
            type: String
        },
        Weight:{
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
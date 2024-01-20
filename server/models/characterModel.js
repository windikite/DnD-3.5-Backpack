const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const characterSchema = new mongoose.Schema(
    {
        owner: {
            type: ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        class: {
            type: [{
                type: ObjectId,
                ref: "class",
            }],
        },
        race: {
            type: [{
                type: ObjectId,
                ref: "race",
            }],
        },
        templates: {
            type: [{
                type: ObjectId,
                ref: "items",
            }],
        },
        stats: [
            con = {
                type: Number
            },
            str = {
                type: Number
            },
            dex = {
                type: Number
            },
            int = {
                type: Number
            },
            wis = {
                type: Number
            },
            cha = {
                type: Number
            },
        ],
        items: {
            type: [{
                type: ObjectId,
                ref: "items",
            }],
        },
    }
)

const Character = mongoose.model('character', characterSchema);

module.exports = Character;
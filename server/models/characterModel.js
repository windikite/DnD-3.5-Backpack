const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const characterSchema = new mongoose.Schema(
    {
        Owner: {
            type: ObjectId,
            required: true
        },
        Name: {
            type: String,
            required: true
        },
        Class: {
            type: [{
                type: ObjectId,
                ref: "class",
            }],
        },
        Race: {
            type: [{
                type: ObjectId,
                ref: "race",
            }],
        },
        Templates: {
            type: [{
                type: ObjectId,
                ref: "items",
            }],
        },
        Stats: [
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
        Items: {
            type: [{
                type: ObjectId,
                ref: "items",
            }],
        },
    }
)

const Character = mongoose.model('character', characterSchema);

module.exports = Character;
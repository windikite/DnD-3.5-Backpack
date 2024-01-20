const mongoose = require('mongoose');

const raceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        levelMod: {
            type: Number,
            required: true
        },
        source: {
            type: Array,
            required: true
        },
        str: {
            type: Number,
            required: true
        },
        con: {
            type: Number,
            required: true
        },
        dex: {
            type: Number,
            required: true
        },
        wis: {
            type: Number,
            required: true
        },
        int: {
            type: Number,
            required: true
        },
        cha: {
            type: Number,
            required: true
        },
    }
)

const Race = mongoose.model('race', raceSchema);

module.exports = Race;
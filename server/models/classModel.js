const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        helpText: {
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
        fort: {
            type: String,
            required: true
        },
        will: {
            type: String,
            required: true
        },
        ref: {
            type: String,
            required: true
        },
        skills: {
            type: String,
            required: true
        },
    }
)

const Class = mongoose.model('class', classSchema);

module.exports = Class;
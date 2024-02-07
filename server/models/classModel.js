const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        helpText: {
            type: String,
            default: null
        },
        hitDice: {
            type: String,
            default: null
        },
        levelMod: {
            type: Number,
            default: null
        },
        source: {
            book: {
                type: String,
                default: null
            },
            page: {
                type: String,
                default: null
            }
        },
        saves: {
            fort: {
                type: String,
                default: null
            },
            will: {
                type: String,
                default: null
            },
            ref: {
                type: String,
                default: null
            },
        },
        skillPointModifier: {
            type: Number,
            default: null
        },
        skills: {
            type: String,
            required: true
        },
        statBonuses: {
            con: {
                type: Number,
                default: null
            },
            str: {
                type: Number,
                default: null
            },
            dex: {
                type: Number,
                default: null
            },
            wis: {
                type: Number,
                default: null
            },
            int: {
                type: Number,
                default: null
            },
            cha: {
                type: Number,
                default: null
            },
        },
        features: {
            lv1: [
                {
                    name: {
                        type: String,
                        default: null
                    },
                    text: {
                        type: String,
                        default: null
                    }
                }
            ],
        }
    }
)

const Class = mongoose.model('class', classSchema);

module.exports = Class;
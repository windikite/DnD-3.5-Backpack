const mongoose = require('mongoose');

const raceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        helpText: {
            type: String,
            default: null
        },
        levelMod: {
            type: Number,
            default: null
        },
        size: {
            type: String,
            default: null
        },
        speed: {
            type: Number,
            default: null
        },
        source: {
            book: {
                type: String,
                default: null
            },
            page: {
                type: Number,
                default: null
            }
        },
        skillPointModifier: {
            type: Number,
            default: null
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

const Race = mongoose.model('race', raceSchema);

module.exports = Race;
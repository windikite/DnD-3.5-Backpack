const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        characters: {
            type: [{
                type: ObjectId,
                ref: "Characters",
            }],
        },
        shops: {
            type: [{
                type: ObjectId,
                ref: "Shops",
            }],
        },
        itemFavorites: {
            type: [{
                type: ObjectId,
                ref: "Items",
            }],
        },

    }
)

const User = mongoose.model('user', userSchema);

module.exports = User;
const Character = require('../../models/characterModel');
const User = require(`../../models/userModel`)

async function getAllCharacters (req, res) {
    try {
        let results = await Character.find({});

        res.json({
            message: 'success',
            payload: results
        })
    } catch (error) {
        let errorObj = {
            message: 'failed to get all Characters: ',
            payload: error
        }

        console.log(errorObj)

        res.json(errorObj)
    }
}

async function getOneCharacter (req, res) {
    try {
        let result = await Character.findOne({character: req.params.character});

        res.json({
            message: 'success',
            payload: result
        })
    } catch (error) {
        let errorObj = {
            message: 'failed to get one Character: ',
            payload: error
        }

        console.log(errorObj)

        res.json(errorObj)
    }
}

async function createOneCharacter(req, res){
    try {
        //get id of user
        // let userId = req.session.user.id;
        let userId = req.body.Owner;

        // Accepting the front-end form data from the client to generate the document
        let newCharacter = {
            Owner: userId,
            Name: req.body.Name,
        }

        //get user to add character to list of characters
        let currentUser = await User.findOne({_id: userId});

        // post the new document to the Character collection
        let char = await Character.create(newCharacter);

        let charId = char._id.toString();
        let newchars = currentUser.characters
        newchars.push(charId)
        let updatedUser = {
            characters: newchars
        }

        await User.updateOne(
            { _id: userId },
            { $set: updatedUser },
            { upsert: true }
        )

        res.json({
            message: 'success',
            payload: newCharacter
        });
    } catch (error) {
        let errorObj = {
            message: 'failed to create one Character: ',
            payload: error
        }

        console.log(errorObj);

        res.json(errorObj);
    }
}

async function deleteOneCharacter(req, res) {
    try {
        await Character.deleteOne({ character: req.params.character });

        res.json({
            message: 'success',
            payload: req.params.character
        })
    } catch (error) {
        let errorObj = {
            message: 'failed to delete one Character: ',
            payload: error
        }

        console.log(errorObj);

        res.json(errorObj);
    }
}

async function updateOneCharacter(req, res){
    try {
        let targetCharacter = await Character.findOne({ character: req.params.character })

        // ternaries avoid inputting undefined values
        let updatedCharacter = {
            character: req.body.character ? req.body.character : targetCharacter.character,
        }

        await Character.updateOne(
            { character: req.params.character },
            { $set: updatedCharacter },
            { upsert: true }
        )

        res.json({
            message: 'success',
            payload: updatedCharacter
        });
    } catch (error) {
        let errorObj = {
            message: 'failed to update one Character: ',
            payload: error
        }

        console.log(errorObj);

        res.json(errorObj);
    }
}

module.exports = {
    getAllCharacters,
    getOneCharacter,
    createOneCharacter, 
    deleteOneCharacter,
    updateOneCharacter
}
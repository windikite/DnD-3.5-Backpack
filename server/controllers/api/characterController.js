const Character = require('../../models/characterModel');
const User = require(`../../models/userModel`)
const Races = require(`../../models/raceModel`);
const Classes = require(`../../models/classModel`);

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
        let userId = req.session.user.id;

        // Accepting the front-end form data from the client to generate the document
        let newCharacter = {
            owner: userId,
            name: req.body.name ? req.body.name : null,

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

        res.redirect(`/characters/${charId}`)
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
            name: req.body.name ? req.body.name : null,
            class: req.body.class ? req.body.class : null,
            templates: req.body.templates ? req.body.templates : null,
            stats: req.body.stats ? req.body.stats : null,
            items: req.body.items ? req.body.items : null,
        }

        await Character.updateOne(
            { character: req.params.id },
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

async function getCharacterOptions(req, res){
    try {
        let classes = await Classes.find();
        let races = await Races.find();

        let options = [];

        options.push(classes, races);
        console.log(options);
        res.json({
            message: 'success',
            payload: updatedCharacter
        });
    } catch (error) {
        let errorObj = {
            message: 'failed to get character options: ',
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
    updateOneCharacter,
    getCharacterOptions
}
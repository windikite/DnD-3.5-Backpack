const Class = require('../../models/classModel');

async function getAllClasses (req, res) {
    try {
        let results = await Class.find({});

        res.json({
            message: 'success',
            payload: results
        })
    } catch (error) {
        let errorObj = {
            message: 'failed to get all classes: ',
            payload: error
        }

        console.log(errorObj)

        res.json(errorObj)
    }
}

async function getOneClass (req, res) {
    try {
        let result = await Class.findOne({_id: req.params.id});

        res.json({
            message: 'success',
            payload: result
        })
    } catch (error) {
        let errorObj = {
            message: 'failed to get class: ',
            payload: error
        }

        console.log(errorObj)

        res.json(errorObj)
    }
}

async function createOneClass(req, res){
    try {
        // Accepting the front-end form data from the client to generate the document
        let newClass = {
            name: req.body.name,
            helpText: req.body.helpText,
            levelMod: req.body.levelMod,
            source: req.body.source,
            fort: req.body.fort,
            will: req.body.will,
            ref: req.body.ref,
            skills: req.body.skills
        }

        // post the new document to the Class collection
        await Class.create(newClass);

        res.json({
            message: 'success',
            payload: newClass
        });
    } catch (error) {
        let errorObj = {
            message: 'failed to create one class: ',
            payload: error
        }

        console.log(errorObj);

        res.json(errorObj);
    }
}

async function deleteOneClass(req, res) {
    try {
        await Class.deleteOne({ _id: req.params.id });

        res.json({
            message: 'success',
            payload: req.params.Class
        })
    } catch (error) {
        let errorObj = {
            message: 'failed to delete one class: ',
            payload: error
        }

        console.log(errorObj);

        res.json(errorObj);
    }
}

async function updateOneClass(req, res){
    try {
        let targetClass = await Class.findOne({ _id: req.params.id })

        // ternaries avoid inputting undefined values
        let updatedClass = {
            name: req.body.name ? req.body.name : targetClass.name,
            helpText: req.body.helpText ? req.body.helpText : targetClass.helpText,
            levelMod: req.body.levelMod ? req.body.levelMod : targetClass.levelMod,
            source: req.body.source ? req.body.source : targetClass.source,
            fort: req.body.fort ? req.body.fort : targetClass.fort,
            will: req.body.will ? req.body.will : targetClass.will,
            ref: req.body.ref ? req.body.ref : targetClass.ref,
            skills: req.body.skills ? req.body.skills : targetClass.skills
        }

        await Class.updateOne(
            { propertyName: req.params.id },
            { $set: updatedClass },
            { upsert: true }
        )

        res.json({
            message: 'success',
            payload: updatedClass
        });
    } catch (error) {
        let errorObj = {
            message: 'failed to update one class: ',
            payload: error
        }

        console.log(errorObj);

        res.json(errorObj);
    }
}

module.exports = {
    getAllClasses,
    getOneClass,
    createOneClass, 
    deleteOneClass,
    updateOneClass
}
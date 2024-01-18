const User = require('../../models/userModel');
const bcrypt = require(`bcrypt`);

async function getAllUsers (req, res) {
    try {
        let results = await User.find({});

        res.json({
            message: 'success',
            payload: results
        })
    } catch (error) {
        let errorObj = {
            message: 'failed to get all User: ',
            payload: error
        }

        console.log(errorObj)

        res.json(errorObj)
    }
}

async function getUser (req, res) {
    try {
        let result = await User.findOne({propertyName: req.params.propertyName});

        res.json({
            message: 'success',
            payload: result
        })
    } catch (error) {
        let errorObj = {
            message: 'failed to get one User: ',
            payload: error
        }

        console.log(errorObj)

        res.json(errorObj)
    }
}

async function createUser(req, res){
    try {
        // Accepting the front-end form data from the client to generate the document
        let {username, password} = req.body;

        //Generate salt
        let salt = await bcrypt.genSalt(10);

        //encrypt password
        let encryptedPassword = await bcrypt.hash(password, salt)
        
        //generate user document
        let newUserObj = {
            username: username,
            password: encryptedPassword,
            characters: [],
            shops: [],
            itemFavorites: []
        }

        // post the new document to the User collection
        await User.create(newUserObj);

        res.redirect(`/logIn`)
    } catch (error) {
        let errorObj = {
            message: 'failed to create one User: ',
            payload: error
        }

        console.log(errorObj);

        res.json(errorObj);
    }
}

async function deleteUser(req, res) {
    try {
        await User.deleteOne({ propertyName: req.params.propertyName });

        res.json({
            message: 'success',
            payload: req.params.propertyName
        })
    } catch (error) {
        let errorObj = {
            message: 'failed to delete one User: ',
            payload: error
        }

        console.log(errorObj);

        res.json(errorObj);
    }
}

async function updateUser(req, res){
    try {
        let targetUser = await User.findOne({ propertyName: req.params.propertyName })

        // ternaries avoid inputting undefined values
        let updatedUser = {
            propertyName: req.body.propertyName ? req.body.propertyName : targetUser.propertyName,
        }

        await User.updateOne(
            { propertyName: req.params.propertyName },
            { $set: updatedUser },
            { upsert: true }
        )

        res.json({
            message: 'success',
            payload: updatedUser
        });
    } catch (error) {
        let errorObj = {
            message: 'failed to update one User: ',
            payload: error
        }

        console.log(errorObj);

        res.json(errorObj);
    }
}

async function logInUser(req, res){
    try{
        //find user that matches username from form
        const user = await User.findOne({
            username: req.body.username
        })
        //if no user, throw error. otherwise compare passwords
        if(!user){
            throw `user not found, please sign up`
        }else{
            //compare incoming password with database password using bcrypt
            let comparedPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            //if password is incorrect, throw error. otherwise, begin server session
            if(!comparedPassword){
                throw `please check password and try again`
            }else{
                //give server login authority
                req.session.isAuth = true;
                //generate user object to attach to server-side session
                let userObj = {
                    username: user.username,
                    id: user._id
                }
                //server-side session holds info about user
                req.session.user = userObj;
                //route can only be seen if req.session.isAuth is set to true
                res.redirect(`/`)
            }
        }
    }catch(error){
        console.log(`failed to log user in: ${error}`);
        res.json({
            message: `failure`,
            payload: error
        })
    }
}

async function logOutUser(req, res){
    try{
        //clear cookie from browser
        res.clearCookie(`connect.sid`, {
            path: `/`,
            httpOnly: true,
            secure: false,
            maxAge: null
        })

        //clear the session from the server
        req.session.destroy();

        //send the client to the home page
        res.redirect(`/`);
    }catch(error){
        console.log(`failed to log out user: ${error}`)
    }
}

async function addItemToFavorites(req, res){
    try{
        //get id of user
        let userId = req.session.user.id;

        //find user currently logged in
        let currentUser = await User.findById({_id: userId});

        //add item's ID to the itemFavorites list
        currentUser.itemFavorites.push(req.body.itemId);

        //generate a clean object to change only the necessary proerpties on the user document
        let newUserObj = {
            itemFavorites: currentUser.itemFavorites
        }

        //update the user document with the new itemFavorites
        await User.updateOne(
            {_id: userId},
            {$set: newUserObj},
            {upsert: true}
        )

        res.redirect(`/items/${req.body.itemId}`);

    }catch(error){
        console.log(`failed to add item to favorites: ${error}`)
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser, 
    deleteUser,
    updateUser,
    logInUser,
    logOutUser,
    addItemToFavorites
}
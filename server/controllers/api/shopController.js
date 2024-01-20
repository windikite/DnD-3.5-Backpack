const Shop = require(`../../models/shopModel`);
const User = require(`../../models/userModel`);

async function getAllShops(req, res){
    try{
        let results = await Shop.find({});
        res.json({
            message: `success`,
            payload: results
        })
    }catch(error){
        let errorObj = {
            message: `failed to get all Shops`,
            payload: error
        };
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function createShop(req, res){
    try{
        //get id of user
        let userId = req.session.user.id;

        // Accepting the front-end form data from the client to generate the document
        let newShop = {
            owner: userId,
            name: req.body.name ? req.body.name : null,
            type: req.body.type ? req.body.type : null,
            location: req.body.location ? req.body.location : null,
            currentCash: req.body.currentCash ? req.body.currentCash : null,
            maxItemValue: req.body.maxItemValue ? req.body.maxItemValue : null,
            maxLevel: req.body.maxLevel ? req.body.maxLevel : null,
            maxWeight: req.body.maxWeight ? req.body.maxWeight : null,
            canIdentify: req.body.canIdentify ? req.body.canIdentify : null,
            dc: req.body.dc ? req.body.dc : null,
            // items: req.body.ItemArray ? (results.items ? (results.items.concat(req.body.ItemArray.split(`,`))) : req.body.ItemArray) : results.items
        }
        let shop = await Shop.create(newShop);

        //get user to add shop to list of shops
        let currentUser = await User.findOne({_id: userId});

        let shopId = shop._id.toString();

        let newshops = currentUser.characters

        newshops.push(shopId)

        let updatedUser = {
            shops: newshops
        }

        await User.updateOne(
            { _id: userId },
            { $set: updatedUser },
            { upsert: true }
        )

        res.redirect(`/shops/${shopId}`)
    }catch(error){
        let errorObj = {
            message: `failed to create Shop`,
            payload: error
        };
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function getShop(req, res){
    try{
        let results = await Shop.find({_id: req.params.id});
        res.json({
            message: `success`,
            payload: results
        })
    }catch(error){
        let errorObj = {
            message: `failed to get Shop`,
            payload: error
        };
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function deleteShop(req, res) {
    try {
        await Shop.deleteOne({ _id: req.params.id });

        // res.json({
        //     message: "success",
        //     payload: await Shop.find({})
        // })

        res.redirect("/shops");
    } catch (error) {
        let errorObj = {
            message: "failed to delete Shop",
            payload: error
        }

        console.log(errorObj);

        res.json(errorObj);
    }
}

async function updateShop(req, res){
    try{
        let results = await Shop.findOne({_id: req.params.id});
        // console.log(`log`, req.body.ItemArray)
        let updatedShop = {
            name: req.body.name ? req.body.name : results.name,
            type: req.body.type ? req.body.type : results.type,
            location: req.body.location ? req.body.location : results.location,
            currentCash: req.body.currentCash ? req.body.currentCash : results.currentCash,
            maxItemValue: req.body.maxItemValue ? req.body.maxItemValue : results.maxItemValue,
            maxLevel: req.body.maxLevel ? req.body.maxLevel : results.maxLevel,
            maxWeight: req.body.maxWeight ? req.body.maxWeight : results.maxWeight,
            canIdentify: req.body.canIdentify ? req.body.canIdentify : results.canIdentify,
            dc: req.body.dc ? req.body.dc : results.dc,
            items: req.body.ItemArray ? (results.items ? (results.items.concat(req.body.ItemArray.split(`,`))) : req.body.ItemArray) : results.items
        }
        console.log(`prev`, results.items)
        console.log(`updated shop`, updatedShop)
        await Shop.updateOne(
            {_id: req.params.id},
            {$set: updatedShop},
            {upsert: true}
        )

        res.redirect(`/shops/${req.params.id}`)
    }catch(error){
        let errorObj = {
            message: `failed to update shop`,
            payload: error
        };
        console.log(errorObj);
        res.json(errorObj);
    }
}

module.exports = {
    getAllShops,
    createShop,
    getShop,
    deleteShop,
    updateShop
}
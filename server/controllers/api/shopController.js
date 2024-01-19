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
            Owner: userId,
            Name: req.body.Name ? req.body.Name : null,
            Type: req.body.Type ? req.body.Type : null,
            Location: req.body.Location ? req.body.Location : null,
            CurrentCash: req.body.CurrentCash ? req.body.CurrentCash : null,
            MaxItemValue: req.body.MaxItemValue ? req.body.MaxItemValue : null,
            MaxLevel: req.body.MaxLevel ? req.body.MaxLevel : null,
            MaxWeight: req.body.MaxWeight ? req.body.MaxWeight : null,
            CanIdentify: req.body.CanIdentify ? req.body.CanIdentify : null,
            DC: req.body.DC ? req.body.DC : null,
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
            Name: req.body.Name ? req.body.Name : results.Name,
            Type: req.body.Type ? req.body.Type : results.Type,
            Location: req.body.Location ? req.body.Location : results.Location,
            CurrentCash: req.body.CurrentCash ? req.body.CurrentCash : results.CurrentCash,
            MaxItemValue: req.body.MaxItemValue ? req.body.MaxItemValue : results.MaxItemValue,
            MaxLevel: req.body.MaxLevel ? req.body.MaxLevel : results.MaxLevel,
            MaxWeight: req.body.MaxWeight ? req.body.MaxWeight : results.MaxWeight,
            CanIdentify: req.body.CanIdentify ? req.body.CanIdentify : results.CanIdentify,
            DC: req.body.DC ? req.body.DC : results.DC,
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
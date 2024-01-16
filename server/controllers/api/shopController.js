const Shop = require(`../../models/shopModel`);

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
        let newShop = await Shop.create(req.body);
        res.redirect(`/shops/${newShop.id}`)
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

// async function deleteShop(req, res) {
//     try {
//         await Shop.deleteOne({ _id: req.params.id });

//         res.json({
//             message: "success",
//             payload: await Shop.find({})
//         })

//         // res.redirect("/allMons");
//     } catch (error) {
//         let errorObj = {
//             message: "failed to delete Shop",
//             payload: error
//         }

//         console.log(errorObj);

//         res.json(errorObj);
//     }
// }

// async function addToShop(req, res){
//     try{
//         let foundShop = await Shop.find({_id: req.params.id});

//     }
// }
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
    // deleteShop,
    updateShop
}
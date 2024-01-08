const Item = require(`../../models/itemModel`);

async function getAllItems(req, res){
    try{
        let results = await Item.find({});
        res.json({
            message: `success`,
            payload: results
        })
    }catch(error){
        let errorObj = {
            message: `failed to get all items`,
            payload: error
        };
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function createItem(req, res){
    try{
        let newItem = await Item.create(req.body);
        res.redirect(`/items/${newItem.id}`)
    }catch(error){
        let errorObj = {
            message: `failed to create item`,
            payload: error
        };
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function getItem(req, res){
    try{
        let results = await Item.find({_id: req.params.id});
        res.json({
            message: `success`,
            payload: results
        })
    }catch(error){
        let errorObj = {
            message: `failed to get item`,
            payload: error
        };
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function deleteItem(req, res) {
    try {
        await Item.deleteOne({ _id: req.params.id });

        res.json({
            message: "success",
            payload: await Item.find({})
        })

        // res.redirect("/allMons");
    } catch (error) {
        let errorObj = {
            message: "failed to delete item",
            payload: error
        }

        console.log(errorObj);

        res.json(errorObj);
    }
}

async function updateItem(req, res){
    try{
        let results = await Item.find({_id: req.params.id});

        let updatedItem = {
            Name: req.body.Name ? req.body.Name : results.Name,
            Type: req.body.Type ? req.body.Type : results.Type,
            Slot: req.body.Slot ? req.body.Slot : results.Slot,
            Price: req.body.Price ? req.body.Price : results.Price,
            Source: req.body.Source ? req.body.Source : results.Source,
            ItemLevel: req.body.ItemLevel ? req.body.ItemLevel : results.ItemLevel,
            CasterLevel: req.body.CasterLevel ? req.body.CasterLevel : results.CasterLevel,
            Aura: req.body.Aura ? req.body.Aura : results.Aura,
            Activation: req.body.Activation ? req.body.Activation : results.Activation,
            Weight: req.body.Weight ? req.body.Weight : results.Weight,
        }

        await Item.updateOne(
            {_id: req.params.id},
            {$set: updatedItem},
            {upsert: true}
        )

        res.redirect(`/items/${req.params.id}`)
    }catch(error){
        let errorObj = {
            message: `failed to update item`,
            payload: error
        };
        console.log(errorObj);
        res.json(errorObj);
    }
}

module.exports = {
    getAllItems,
    createItem,
    getItem,
    deleteItem,
    updateItem
}
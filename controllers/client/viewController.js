const Item = require(`../../models/itemModel`);
const Shop = require(`../../models/shopModel`);

function renderHomePage(req, res){
    res.render(`home`);
};

async function renderItems(req, res){
    try{
        let result = await Item.find({});
        res.render(`items`, {results: result})
    }catch(error){
        let errorObj = {
            message: `failed to render items`,
            payload: error
        }
        console.log(errorObj)
        res.json(errorObj)
    }
}

async function renderItem(req, res){
    try{
        let result = await Item.findOne({_id: req.params.id});
        res.render(`item`, {results: result})
    }catch(error){
        let errorObj = {
            message: `failed to render item`,
            payload: error
        }
        console.log(errorObj)
        res.json(errorObj)
    }
}

async function renderUpdateItem(req, res){
    try{
        let result = await Item.findOne({_id: req.params.id});
        res.render(`updateItem`, {results: result})
    }catch(error){
        let errorObj = {
            message: `failed to render update item page`,
            payload: error
        }
        console.log(errorObj)
        res.json(errorObj)
    }
}

async function renderCreateItem(req, res){
    try{
        res.render(`createItem`)
    }catch(error){
        let errorObj = {
            message: `failed to render create item page`,
            payload: error
        }
        console.log(errorObj)
        res.json(errorObj)
    }
}
//shops
async function renderShops(req, res){
    try{
        let result = await Shop.find({});
        res.render(`shops`, {results: result})
    }catch(error){
        let errorObj = {
            message: `failed to render shops`,
            payload: error
        }
        console.log(errorObj)
        res.json(errorObj)
    }
}

async function renderShop(req, res){
    try{
        let result = await Shop.findOne({_id: req.params.id});
        let stockArray = [];
        console.log(result.items)
        result.items.forEach(async (id) => {
            let itemLookup = await Item.findOne({_id: id});
            stockArray.push(itemLookup);
            if(stockArray.length === result.items.length){
                res.render(`shop`, {results: result, stock: stockArray})
            }
        })
        
        
    }catch(error){
        let errorObj = {
            message: `failed to render shop`,
            payload: error
        }
        console.log(errorObj)
        res.json(errorObj)
    }
}

async function renderCreateShop(req, res){
    try{
        res.render(`createShop`)
    }catch(error){
        let errorObj = {
            message: `failed to render create shop page`,
            payload: error
        }
        console.log(errorObj)
        res.json(errorObj)
    }
}

async function renderUpdateShop(req, res){
    try{
        let result = await Shop.findOne({_id: req.params.id});
        res.render(`updateShop`, {results: result})
    }catch(error){
        let errorObj = {
            message: `failed to render update shop page`,
            payload: error
        }
        console.log(errorObj)
        res.json(errorObj)
    }
}

module.exports = {
    renderHomePage,
    renderItems,
    renderItem,
    renderUpdateItem,
    renderCreateItem,
    renderShops,
    renderShop,
    renderUpdateShop,
    renderCreateShop
}
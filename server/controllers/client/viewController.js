const Item = require(`../../models/itemModel`);
const Shop = require(`../../models/shopModel`);
const User = require(`../../models/userModel`);
const Character = require(`../../models/characterModel`);

function renderHomePage(req, res){
    res.render(`home`);
};

async function renderItems(req, res){
    try{
        let result = await Item.find({});
        let shops = await Shop.find({});
        res.render(`item/items`, {results: result, shops: shops})
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
        let item = await Item.findOne({_id: req.params.id});
        let userFaves
        if(req.session.isAuth){
            let currentUser = await User.findOne({
                username: req.session.user.username
            })
            userFaves = currentUser.itemFavorites
        }else{
            userFaves = []
        }
        res.render(`item/item`, {item: item, userFaves: userFaves})
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
        res.render(`item/updateItem`, {results: result})
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
        res.render(`item/createItem`)
    }catch(error){
        let errorObj = {
            message: `failed to render create item page`,
            payload: error
        }
        console.log(errorObj)
        res.json(errorObj)
    }
}

async function renderShops(req, res){
    try{
        let result = await Shop.find({});
        res.render(`shop/shops`, {results: result})
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
        console.log(`attempting to render shop page`)
        let result = await Shop.findOne({_id: req.params.id});
        let stockArray = [];
        console.log(`items`, result.items)
        if(result.items.length >= 1){
            result.items.forEach(async (id) => {
                let itemLookup = await Item.findOne({_id: id});
                stockArray.push(itemLookup);
                if(stockArray.length >= result.items.length){
                    res.render(`shop/shop`, {results: result, stock: stockArray})
                }
            })
        }else{
            res.render(`shop/shop`, {results: result, stock: stockArray})
        }
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
        res.render(`shop/createShop`)
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
        res.render(`shop/updateShop`, {results: result})
    }catch(error){
        let errorObj = {
            message: `failed to render update shop page`,
            payload: error
        }
        console.log(errorObj)
        res.json(errorObj)
    }
}

async function renderSignUpForm(req, res){
    try{
        res.render(`user/signUp`);
    }catch(error){
        console.log(`failed to render sign up form: ${error}`);
    };
}

async function renderLogInForm(req, res){
    try{
        res.render(`user/logIn`);
    }catch(error){
        console.log(`failed to render log in form: ${error}`);
    };
}

async function renderUser(req, res){
    try{
        if(req.session.isAuth){
            //try to find user
            let currentUser = await User.findOne({
                _id: req.session.user.id
            });

            //find users' characters
            let characterList = []

            for(let i = 0; i < currentUser.characters.length; i++){
                let oneCharacter = await Character.findOne({_id: currentUser.characters[i]});

                characterList.push(oneCharacter);
            }

            //find users' shops
            let shopList = []

            for(let i = 0; i < currentUser.shops.length; i++){
                let oneshop = await Shop.findOne({_id: currentUser.shops[i]});

                shopList.push(oneshop);
            }

            //find users' favorite items
            let itemFavoritesList = []

            for(let i = 0; i < currentUser.itemFavorites.length; i++){
                let oneitemFavorites = await Item.findOne({_id: currentUser.itemFavorites[i]});

                itemFavoritesList.push(oneitemFavorites);
            }
            res.render(`user/user`, {
                user: currentUser, 
                characters: characterList, 
                shops: shopList, 
                items: itemFavoritesList})
        }else{
            res.redirect(`/user/logIn`)
        }
    }catch(error){
        let errorObj = {
            message: `failed to render user`,
            payload: error
        }
        console.log(errorObj)
        res.json(errorObj)
    }
};

module.exports = {
    renderHomePage,
    renderItems,
    renderItem,
    renderUpdateItem,
    renderCreateItem,
    renderShops,
    renderShop,
    renderUpdateShop,
    renderCreateShop,
    renderSignUpForm,
    renderLogInForm,
    renderUser
}
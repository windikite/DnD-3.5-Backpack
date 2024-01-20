const router = require(`express`).Router();

const {
    renderHomePage,
    renderItems,
    renderItem,
    renderUpdateItem, 
    renderCreateItem,
    renderShops,
    renderShop,
    renderUpdateShop, 
    renderCreateShop,
    renderLogInForm,
    renderSignUpForm,
    renderUser,
    renderCharacter,
    renderCharacterCreator
} = require(`../../controllers/client/viewController`);
//utility
router.get(`/`, renderHomePage);
//items
router.get(`/items`, renderItems);
router.get(`/items/:id`, renderItem);
router.get(`/update-item/:id`, renderUpdateItem);
router.get(`/create-item`, renderCreateItem);
//shops
router.get(`/shops`, renderShops);
router.get(`/shops/:id`, renderShop);
router.get(`/update-shop/:id`, renderUpdateShop);
router.get(`/create-shop`, renderCreateShop);
//users
router.get(`/signUp`, renderSignUpForm);
router.get(`/logIn`, renderLogInForm);
router.get(`/users/user`, renderUser);
//characters
router.get(`/characters/:id`, renderCharacter);
router.get(`/create-character`, renderCharacterCreator)

module.exports = router;
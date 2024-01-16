const router = require(`express`).Router();

const {
    getAllShops,
    createShop,
    getShop,
    // deleteShop,
    updateShop
} = require(`../../controllers/api/shopController`);

router.get(`/allShops`, getAllShops);
router.post(`/create-shop`, createShop);
router.get(`/:id`, getShop);
// router.delete(`/delete-shop/:id`, deleteShop);
router.put(`/update-shop/:id`, updateShop);

module.exports = router;
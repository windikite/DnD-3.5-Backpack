const router = require(`express`).Router();

const {
    getAllItems,
    createItem,
    getItem,
    deleteItem,
    updateItem
} = require(`../../controllers/api/itemController`);

router.get(`/allItems`, getAllItems);
router.post(`/create-item`, createItem);
router.get(`/:id`, getItem);
router.delete(`/delete-item/:id`, deleteItem);
router.put(`/update-item/:id`, updateItem);

module.exports = router;
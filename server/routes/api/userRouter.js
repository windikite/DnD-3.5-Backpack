const router = require('express').Router();

const {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    logInUser,
    logOutUser,
    addItemToFavorites
} = require('../../controllers/api/userController');

// localhost:8080/api/users/allUsers
router.get('/allUsers', getAllUsers);
// localhost:8080/api/users/oneUser/:params
router.get('/user/:params', getUser);
// localhost:8080/api/users/createOneUser
router.post('/createUser', createUser);
// localhost:8080/api/users/deleteOneUser/:params
router.delete('/deleteUser/:params', deleteUser);
// localhost:8080/api/users/updateOneUser/:params
router.put('/updateUser/:params', updateUser);
//localhost:8080/api/users/logInUser
router.post(`/logIn`, logInUser);
//localhost:8080/api/users/logOutUser
router.get(`/logOut`, logOutUser);
//localhost:8080/api/users/addItemToFavorites
router.put(`/addItemToFavorites`, addItemToFavorites);

module.exports = router;

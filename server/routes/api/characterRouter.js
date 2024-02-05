const router = require('express').Router();

const {
    getAllCharacters,
    getOneCharacter,
    createOneCharacter,
    deleteOneCharacter,
    updateOneCharacter,
    getCharacterOptions
} = require('../../controllers/api/characterController');

// localhost:8080/api/characters/allCharacter
router.get('/allCharacters', getAllCharacters);

// localhost:8080/api/characters/oneCharacter/:params
router.get('/oneCharacter/:params', getOneCharacter);

// localhost:8080/api/characters/createOneCharacter
router.post('/createCharacter', createOneCharacter);

// localhost:8080/api/characters/deleteOneCharacter/:params
router.delete('/deleteCharacter/:params', deleteOneCharacter);

// localhost:8080/api/characters/updateOneCharacter/:params
router.put('/updateCharacter/:params', updateOneCharacter);

router.get(`/options`, getCharacterOptions);

module.exports = router;
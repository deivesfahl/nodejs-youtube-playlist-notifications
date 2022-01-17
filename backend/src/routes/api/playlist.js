const express = require('express');
const router = express.Router();

const PlaylistController = require('../../app/controllers/PlaylistController');

const {
    getInformationsValidations,
    storeValidations,
    updateValidations,
    destroyValidations,
} = require('../../app/validations/PlaylistValidation');

router.get('/', PlaylistController.index);
router.get('/:id/informations', getInformationsValidations, PlaylistController.informations);
router.post('/', storeValidations, PlaylistController.store);
router.put('/:id', updateValidations, PlaylistController.update);
router.delete('/:id', destroyValidations, PlaylistController.destroy);

module.exports = router;

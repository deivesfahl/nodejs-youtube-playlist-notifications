const express = require('express');
const router = express.Router();

const VideoController = require('../../app/controllers/VideoController');

const { storeValidations, updateValidations, destroyValidations } = require('../../app/validations/VideoValidation');

router.get('/', VideoController.index);
router.post('/', storeValidations, VideoController.store);
router.put('/:id', updateValidations, VideoController.update);
router.delete('/:id', destroyValidations, VideoController.destroy);

module.exports = router;

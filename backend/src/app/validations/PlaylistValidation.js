const { body, param } = require('express-validator');
const { messages } = require('../utils/Validation');

const getInformationsValidations = [param('id').isUUID().withMessage(messages.validUuid.param)];

const storeValidations = [
    body('title').not().isEmpty().withMessage(messages.required),
    body('url').not().isEmpty().withMessage(messages.required),
    body('url').isURL().withMessage(messages.validUrl),
];

const updateValidations = [
    param('id').isUUID().withMessage(messages.validUuid.param),
    body('title').not().isEmpty().optional({ nullable: true }).withMessage(messages.required),
];

const destroyValidations = [param('id').isUUID().withMessage(messages.validUuid.param)];

module.exports = { getInformationsValidations, storeValidations, updateValidations, destroyValidations };

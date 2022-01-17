const { body, param } = require('express-validator');
const { messages } = require('../utils/Validation');

const storeValidations = [
    body('title').not().isEmpty().withMessage(messages.required),
    body('url').not().isEmpty().withMessage(messages.required),
    body('url').isURL().withMessage(messages.validUrl),
    body('imageUrl').not().isEmpty().withMessage(messages.required),
    body('imageUrl').isURL().withMessage(messages.validUrl),
    body('notify').not().isEmpty().withMessage(messages.required),
    body('notify').isLength({ max: 1 }).withMessage(messages.max.replace('$1', '1')),
    body('playlistId').not().isEmpty().withMessage(messages.required),
    body('playlistId').isUUID().withMessage(messages.validUuid.field),
];

const updateValidations = [
    param('id').isUUID().withMessage(messages.validUuid.param),
    body('title').not().isEmpty().optional({ nullable: true }).withMessage(messages.required),
    body('imageUrl').not().isEmpty().optional({ nullable: true }).withMessage(messages.required),
    body('imageUrl').isURL().optional({ nullable: true }).withMessage(messages.validUrl),
    body('notify').not().isEmpty().optional({ nullable: true }).withMessage(messages.required),
    body('notify').isLength({ max: 1 }).optional({ nullable: true }).withMessage(messages.max.replace('$1', '1')),
];

const destroyValidations = [param('id').isUUID().withMessage(messages.validUuid.param)];

module.exports = { storeValidations, updateValidations, destroyValidations };

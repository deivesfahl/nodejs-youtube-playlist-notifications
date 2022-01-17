const { validationResult } = require('express-validator');

const errors = request => {
    const format = ({ msg: message }) => message;

    return validationResult(request).formatWith(format);
};

const hasErrors = request => !errors(request).isEmpty();

const messages = {
    max: 'Field must not be greater than $1 character(res).',
    required: 'Field is required',
    validUrl: 'Field must be a valid URL',
    validUuid: {
        field: 'Field must be a valid UUID',
        param: 'Param must be a valid UUID',
    },
};

module.exports = { errors, hasErrors, messages };

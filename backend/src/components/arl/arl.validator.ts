import { body, param } from 'express-validator';
import { ValidationMessages } from './validation.messages';
import { Arl } from '../../database/models/arl';
import { validateARLId, validateCreateUserId, validateDescription, validateUpdateUserId } from '../../lib/global.validators';

const validateARLName = (isOptional = false) => {
    const validator = body('arl')
        .trim()
        .isLength({ min: 3 })
        .withMessage(ValidationMessages.ARLMinLength)
        .isLength({ max: 50 })
        .withMessage(ValidationMessages.ARLMaxLength)
        .custom(async (value) => {
            const arl = await Arl.findOne({ where: { arl: value } });
            if (arl) {
                return Promise.reject(ValidationMessages.ARLInUse);
            }
        });

    return isOptional 
        ? validator.optional() 
        : validator.not().isEmpty().withMessage(ValidationMessages.ARLRequired);
};

const createARLValidator = () => [
    validateARLName(),
    validateCreateUserId()
];

const updateARLValidator = () => [
    validateARLId(),
    validateARLName(true),
    validateUpdateUserId()
];

const getARLValidator = () => [
    validateARLId()
];

const searchValidator = () => [
    validateARLName(true),
    validateDescription(true)
];

export { createARLValidator, updateARLValidator, getARLValidator, searchValidator };
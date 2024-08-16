import { body } from 'express-validator';
import { ValidationMessages } from './validation.messages';
import { validateClientId, validateContactId, validateContactTypeId, validateCreateUserId, validateJobTitleId, validateResidentTypeId, validateSubLocationId, validateUpdateUserId } from '../../lib/global.validators';
import { User } from '../../database/models/user.model';


const validatedMainContact = () => {
    return body('main_contact')
        .isBoolean()
        .optional()
        .withMessage(ValidationMessages.MainContactBoolean)
}

const validateQRPathMaxLenght = (isOptional = false) => {
    const validator = body('qr_path')
        .isLength({ max: 200 })
        .withMessage(ValidationMessages.ValidateQRPathMaxLenght)

    return isOptional
        ? validator.optional()
        : validator
}

const validateUserId = (isOptional = false) => {
    const validator = body('user_id');

    return isOptional
        ? validator.optional()
        : validator.custom(async (value) => {
            const user = await User.findByPk(value);
            if (!user) {
                return Promise.reject(ValidationMessages.UserIdRequired);
            }
        });
}


const createContactValidator = () => [
    validatedMainContact(),
    validateQRPathMaxLenght(true),
    validateUserId(),
    validateContactTypeId(),
    validateResidentTypeId(true),
    validateJobTitleId(true),
    validateClientId(),
    validateSubLocationId(),
    validateCreateUserId(),
];

const updateContactValidator = () => [
    validatedMainContact(),
    validateQRPathMaxLenght(true),
    validateUserId(true),
    validateContactTypeId(true),
    validateResidentTypeId(true),
    validateJobTitleId(true),
    validateClientId(),
    validateSubLocationId(true),
    validateUpdateUserId(),
];

const getContactValidator = () => [
    validateContactId(),
];

const searchValidator = () => [
    validatedMainContact(),
    validateQRPathMaxLenght(true),
    validateUserId(true),
    validateContactTypeId(true),
    validateResidentTypeId(true),
    validateJobTitleId(true),
    validateClientId(true),
    validateSubLocationId(true),
];

export { createContactValidator, updateContactValidator, getContactValidator, searchValidator };
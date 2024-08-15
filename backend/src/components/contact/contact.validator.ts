import { body, param } from 'express-validator';
import { ValidationMessages } from './validation.messages';
import { validateContactId } from '../../lib/global.validators';


const validatedMainContact = () => {
    return body('main_contact')
        .isBoolean()
        .optional()
        .withMessage(ValidationMessages.MainContactBoolean)
}

const validateQRPathMaxLenght = ( isOptional = false ) => {
    const validator = body('qr_path')
        .isLength({ max: 200 })
        .withMessage(ValidationMessages.ValidateQRPathMaxLenght)

        return isOptional
            ? validator.optional() 
            : validator
}

const validateUserId = ( isOptional = false ) => {
    const validator = body('user_id');
}


const createContactValidator = () => [
    validatedMainContact(),
    validateQRPathMaxLenght(true)
];

const updateContactValidator = () => [
    validatedMainContact(),
    validateQRPathMaxLenght(true),
];

const getContactValidator = () => [
    validateContactId(),
];

const searchValidator = () => [

];

export { createContactValidator, updateContactValidator, getContactValidator, searchValidator };
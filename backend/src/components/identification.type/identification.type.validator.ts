import { body } from 'express-validator';
import { ValidationMessages } from './validation.messages';
import { IdentificationType } from '../../database/models/identification.type';

const validateIdentificationTypeName = (isOptional = false) => {
    const validator = body('identificacion_type')
        .trim()
        .isLength({ min: 3 })
        .withMessage(ValidationMessages.IdentificationTypeMinLength)
        .isLength({ max: 50 })
        .withMessage(ValidationMessages.IdentificationTypeMaxLength)
        .custom(async (value) => {
            const identificacionType = await IdentificationType.findOne({where: { identification_type : value } });
            if (identificacionType) {
                return Promise.reject(ValidationMessages.IdentificationTypeInUse);
            }
        });

    return isOptional 
        ? validator.optional() 
        : validator.not().isEmpty().withMessage(ValidationMessages.IdentificationTypeRequired);
};

const validateDescription = (isOptional = false) => {
    const validator = body('description')
        .trim()
        .isLength({ min: 10 })
        .withMessage(ValidationMessages.DescriptionMinLength)
        .isLength({ max: 200 })
        .withMessage(ValidationMessages.DescriptionMaxLength);

    return isOptional 
        ? validator.optional() 
        : validator.not().isEmpty().withMessage(ValidationMessages.DescriptionRequired);
};

const validateIdentificationTypeId = () => {
    return body('identificacion_type_id')
        .not().isEmpty()
        .withMessage(ValidationMessages.IdentificationTypeIdRequired)
        .custom(async (value) => {
            const identificacionType = await IdentificationType.findByPk(value);
            if (!identificacionType) {
                return Promise.reject(ValidationMessages.IdentificationTypeNotFound);
            }
        });
};

const createIdentificationTypeValidator = () => [
    validateIdentificationTypeName(),
    validateDescription()
];

const updateIdentificationTypeValidator = () => [
    validateIdentificationTypeId(),
    validateIdentificationTypeName(true),
    validateDescription(true)
];

const getIdentificationTypeValidator = () => [
    validateIdentificationTypeId()
];

const searchValidator = () => [
    validateIdentificationTypeName(true),
    validateDescription(true)
];

export { createIdentificationTypeValidator, updateIdentificationTypeValidator, getIdentificationTypeValidator, searchValidator };
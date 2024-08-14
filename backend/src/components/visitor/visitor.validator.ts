import { body, param } from 'express-validator';
import { ValidationMessages } from './visitor.messages';
import { ClientType } from '../../database/models/client.type.model';

const validateClientTypeName = (isOptional = false) => {
    const validator = body('client_type')
        .trim()
        .isLength({ min: 3 })
        .withMessage(ValidationMessages.ClientTypeMinLength)
        .isLength({ max: 50 })
        .withMessage(ValidationMessages.ClientTypeMaxLength)
        .custom(async (value) => {
            const clientType = await ClientType.findOne({ where: { client_type: value } });
            if (clientType) {
                return Promise.reject(ValidationMessages.ClientTypeInUse);
            }
        });

    return isOptional 
        ? validator.optional() 
        : validator.not().isEmpty().withMessage(ValidationMessages.ClientTypeRequired);
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

const validateClientTypeId = () => {
    return body('client_type_id')
        .not().isEmpty()
        .withMessage(ValidationMessages.ClientTypeIdRequired)
        .custom(async (value) => {
            const clientType = await ClientType.findByPk(value);
            if (!clientType) {
                return Promise.reject(ValidationMessages.ClientTypeNotFound);
            }
        });
};

const createClientTypeValidator = () => [
    validateClientTypeName(),
    validateDescription()
];

const updateClientTypeValidator = () => [
    validateClientTypeId(),
    validateClientTypeName(true),
    validateDescription(true)
];

const getClientTypeValidator = () => [
    validateClientTypeId()
];

const searchValidator = () => [
    validateClientTypeName(true),
    validateDescription(true)
];

export { createClientTypeValidator, updateClientTypeValidator, getClientTypeValidator, searchValidator };
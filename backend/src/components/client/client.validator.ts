import { body } from 'express-validator';
import { ValidationClientMessages } from './validation.messages';
import { Client } from '../../database/models/client.model';
import { ClientType } from '../../database/models/client.type.model';
import { User } from '../../database/models/user.model';

const validateClientName = (isOptional = false) => {
    const validator = body('client_name')
        .trim()
        .isLength({ min: 5 })
        .withMessage(ValidationClientMessages.ClientNameMinLength)
        .isLength({ max: 100 })
        .withMessage(ValidationClientMessages.ClientNameMaxLength)
        .custom(async (value) => {
            const user = await Client.findOne({ where: { client_name: value } });
            if (user) {
                return Promise.reject(ValidationClientMessages.ClientNameInUse);
            }
        });
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationClientMessages.ClientNameRequired);
};

const validateNit = (isOptional = false) => {
    const validator = body('nit')
        .trim()
        .isLength({ min: 6 })
        .withMessage(ValidationClientMessages.NitMinLength)
        .isLength({ max: 50 })
        .withMessage(ValidationClientMessages.NitMaxLength)
        .custom(async (value) => {
            const client = await Client.findOne({ where: { nit: value } });
            if (client) {
                return Promise.reject(ValidationClientMessages.NitInUse);
            }
        });
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationClientMessages.NitRequired);
};

const validateAddress = (isOptional = false) => {
    const validator = body('address')
        .trim()
        .isLength({ min: 5 })
        .withMessage(ValidationClientMessages.AddressMinLength)
        .isLength({ max: 100 })
        .withMessage(ValidationClientMessages.AddressMaxLength);
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationClientMessages.AddressRequired);
};

const validatePhone = (isOptional = false) => {
    const validator = body('phone')
        .trim()
        .isLength({ min: 3 })
        .withMessage(ValidationClientMessages.PhoneMinLength)
        .isLength({ max: 20 })
        .withMessage(ValidationClientMessages.PhoneMaxLength)
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationClientMessages.PhoneRequired);
};

const validateClientEmail = (isOptional = false) => {
    const validator = body('contact_email')
        .trim()
        .isEmail()
        .withMessage(ValidationClientMessages.ClientEmailInvalid)
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationClientMessages.ClientEmailRequired);
};

const validateClientTypeId = (isOptional = false) => {
    const validator = body('client_type_id')
        .not().isEmpty()
        .withMessage(ValidationClientMessages.ClientIdRequired)
        .custom(async (value) => {
            const clientType = await ClientType.findByPk(value);
            if (!clientType) {
                return Promise.reject(ValidationClientMessages.ClientTypeNotFound);
            }
        });
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationClientMessages.ClientTypeIdRequired);
};

const validateClientId = () => {
    return body('client_id')
        .not().isEmpty()
        .withMessage(ValidationClientMessages.ClientIdRequired)
        .custom(async (value) => {
            const user = await Client.findByPk(value);
            if (!user) {
                return Promise.reject(ValidationClientMessages.ClientNotFound);
            }
        });
};

const validateUserId = () => {
    return body('created_by')
        .not().isEmpty()
        .withMessage(ValidationClientMessages.UserIdRequired)
        .custom(async (value) => {
            const user = await User.findByPk(value);
            if (!user) {
                return Promise.reject(ValidationClientMessages.UserNotFound);
            }
        });
};

const validateClientObservation = () => {
    return body('observations')
        .isLength({ max: 100 })
        .withMessage(ValidationClientMessages.ClientObservationsMaxLength)
}


const createClientValidator = () => [
    validateClientName(),
    validateNit(),
    validateAddress(),
    validatePhone(),
    validateClientEmail(),
    validateClientTypeId(),
    validateClientObservation(),
    validateUserId()
];

const updateClientValidator = () => [
    validateClientId(),
    validateClientName(true),
    validateNit(true),
    validateAddress(true),
    validatePhone(true),
    validateClientEmail(true),
    validateClientTypeId(true),
    validateClientObservation(),
    validateUserId(),
];

const getClientValidator = () => [
    validateClientId()
];

const searchClientValidator = () => [
    validateClientName(true),
    validateNit(true),
    validateAddress(true),
    validatePhone(true),
    validateClientEmail(true),
    validateClientTypeId(true),
];


export {
    createClientValidator,
    updateClientValidator,
    getClientValidator,
    searchClientValidator
};
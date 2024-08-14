import { body } from 'express-validator';
import { ValidationMessages } from './validation.messages';
import { Location } from '../../database/models/location';
import { DropDownListItem } from '../../database/models';
import { Client } from '../../database/models/client.model';
import { User } from '../../database/models/user.model';

const validateLocationName = (isOptional = false) => {
    const validator = body('location_name')
        .trim()
        .isLength({ min: 3 })
        .withMessage(ValidationMessages.LocationNameMinLength)
        .isLength({ max: 50 })
        .withMessage(ValidationMessages.LocationNameMaxLength)
        .custom(async (value) => {
            const location = await Location.findOne({ where: { location_name: value } });
            if (location) {
                return Promise.reject(ValidationMessages.LocationInUse);
            }
        });

    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationMessages.LocationNameRequired);
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

const validateLocationId = () => {
    return body('location_id')
        .not().isEmpty()
        .withMessage(ValidationMessages.LocationIdRequired)
        .custom(async (value) => {
            const location = await Location.findByPk(value);
            if (!location) {
                return Promise.reject(ValidationMessages.LocationNotFound);
            }
        });
};

const validateLocationTypeId = (isOptional = false) => {
    const validator = body('location_type_id')
        .not().isEmpty()
        .withMessage(ValidationMessages.LocationTypeIdRequired)
        .custom(async (value) => {
            const locationType = await DropDownListItem.findByPk(value);
            if (!locationType) {
                return Promise.reject(ValidationMessages.LocationTypeNotFound);
            }
        })
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationMessages.DescriptionRequired);
};

const validateClientId = (isOptional = false) => {
    const validator = body('client_id')
        .not().isEmpty()
        .withMessage(ValidationMessages.ClientIdRequired)
        .custom(async (value) => {
            const location = await Client.findByPk(value);
            if (!location) {
                return Promise.reject(ValidationMessages.ClientNotFound);
            }
        })
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationMessages.DescriptionRequired);
};

const validateUserId = () => {
    return body('created_by')
        .not().isEmpty()
        .withMessage(ValidationMessages.UserIdRequired)
        .custom(async (value) => {
            const location = await User.findByPk(value);
            if (!location) {
                return Promise.reject(ValidationMessages.UserNotFound);
            }
        });
};

const createLocationValidator = () => [
    validateLocationName(),
    validateDescription(),
    validateLocationTypeId(),
    validateClientId(),
    validateUserId(),
];

const updateLocationValidator = () => [
    validateLocationId(),
    validateLocationName(true),
    validateDescription(true),
    validateLocationTypeId(true),
    validateClientId(true),
];

const getLocationValidator = () => [
    validateLocationId()
];

const searchValidator = () => [
    validateLocationName(true),
    validateDescription(true)
];

export { createLocationValidator, updateLocationValidator, getLocationValidator, searchValidator };
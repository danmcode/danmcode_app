import { body } from 'express-validator';
import { ValidationMessages } from './validation.messages';
import { Location } from '../../database/models/location';
import { SubLocation } from '../../database/models/sub.location';
import { User } from '../../database/models/user.model';

const validateSubLocationName = (isOptional = false) => {
    const validator = body('sub_location_name')
        .trim()
        .isLength({ min: 3 })
        .withMessage(ValidationMessages.SubLocationNameMinLength)
        .isLength({ max: 50 })
        .withMessage(ValidationMessages.SubLocationNameMaxLength)
        .custom(async (value) => {
            const subLocation = await SubLocation.findOne({ where: { sub_location_name: value } });
            if (subLocation) {
                return Promise.reject(ValidationMessages.SubLocationInUse);
            }
        });

    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationMessages.SubLocationNameRequired);
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

const validateSubLocationId = () => {
    return body('sub_location_id')
        .not().isEmpty()
        .withMessage(ValidationMessages.SubLocationIdRequired)
        .custom(async (value) => {
            const subLocation = await SubLocation.findByPk(value);
            if (!subLocation) {
                return Promise.reject(ValidationMessages.SubLocationNotFound);
            }
        });
};

const validateLocationTypeId = (isOptional = false) => {
    const validator = body('location_type_id')
        .not().isEmpty()
        .withMessage(ValidationMessages.LocationTypeIdRequired)
        .custom(async (value) => {
            const subLocation = await SubLocation.findByPk(value);
            if (!subLocation) {
                return Promise.reject(ValidationMessages.LocationNotFound);
            }
        })
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationMessages.DescriptionRequired);
};

const validateLocationId = (isOptional = false) => {
    const validator = body('location_id')
        .not().isEmpty()
        .withMessage(ValidationMessages.LocationIdRequired)
        .custom(async (value) => {
            const subLocation = await Location.findByPk(value);
            if (!subLocation) {
                return Promise.reject(ValidationMessages.LocationNotFound);
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

const createSubLocationValidator = () => [
    validateSubLocationName(),
    validateDescription(),
    validateLocationTypeId(),
    validateLocationId(),
    validateUserId(),
];

const updateSubLocationValidator = () => [
    validateSubLocationId(),
    validateSubLocationName(true),
    validateDescription(true),
    validateLocationTypeId(true),
    validateLocationId(true),
];

const getSubLocationValidator = () => [
    validateSubLocationId()
];

const searchValidator = () => [
    validateSubLocationName(true),
    validateDescription(true)
];

export { createSubLocationValidator, updateSubLocationValidator, getSubLocationValidator, searchValidator };
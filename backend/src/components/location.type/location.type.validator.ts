import { body } from 'express-validator';
import { ValidationMessages } from './validation.messages';
import { LocationType } from '../../database/models/location.type';

const validateLocationTypeName = (isOptional = false) => {
    const validator = body('location_type')
        .trim()
        .isLength({ min: 3 })
        .withMessage(ValidationMessages.LocationTypeMinLength)
        .isLength({ max: 50 })
        .withMessage(ValidationMessages.LocationTypeMaxLength)
        .custom(async (value) => {
            const locationType = await LocationType.findOne({where: { location_type : value } });
            if (locationType) {
                return Promise.reject(ValidationMessages.LocationTypeInUse);
            }
        });

    return isOptional 
        ? validator.optional() 
        : validator.not().isEmpty().withMessage(ValidationMessages.LocationTypeRequired);
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

const validateLocationTypeId = () => {
    return body('location_type_id')
        .not().isEmpty()
        .withMessage(ValidationMessages.LocationTypeIdRequired)
        .custom(async (value) => {
            const locationType = await LocationType.findByPk(value);
            if (!locationType) {
                return Promise.reject(ValidationMessages.LocationTypeNotFound);
            }
        });
};

const createLocationTypeValidator = () => [
    validateLocationTypeName(),
    validateDescription()
];

const updateLocationTypeValidator = () => [
    validateLocationTypeId(),
    validateLocationTypeName(true),
    validateDescription(true)
];

const getLocationTypeValidator = () => [
    validateLocationTypeId()
];

const searchValidator = () => [
    validateLocationTypeName(true),
    validateDescription(true)
];

export { createLocationTypeValidator, updateLocationTypeValidator, getLocationTypeValidator, searchValidator };
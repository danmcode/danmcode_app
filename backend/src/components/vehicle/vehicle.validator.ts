import { body } from 'express-validator';
import { ValidationMessages } from './validation.messages';
import { validateContactId, validateCreateUserId, validateDescription, validateUpdateUserId, validateVehicleId, validateVehicleTypeId } from '../../lib/global.validators';
import { Vehicle } from '../../database/models/vehicle';

const validateBrand = (isOptional = false) => {
    const validator = body('brand')
        .trim().isLength({ min: 3 }).withMessage(ValidationMessages.BrandMinLength)
        .isLength({ max: 50 }).withMessage(ValidationMessages.BrandMaxLength);

    return isOptional 
        ? validator.optional() 
        : validator.not().isEmpty().withMessage(ValidationMessages.BrandRequired);
};

const validateColor = (isOptional = false) => {
    const validator = body('color')
        .trim().isLength({ min: 3 }).withMessage(ValidationMessages.ColorMinLength)
        .isLength({ max: 50 }).withMessage(ValidationMessages.ColorMaxLength);

    return isOptional 
        ? validator.optional() 
        : validator.not().isEmpty().withMessage(ValidationMessages.BrandRequired);
};

const validateLicensePlate = (isOptional = false) => {
    const validator = body('license_plate')
        .trim().isLength({ min: 6 }).withMessage(ValidationMessages.LicensePlateMinLength)
        .isLength({ max: 6 }).withMessage(ValidationMessages.LicensePlateMaxLength)
        .custom(async (value) => {
            const vehicle = await Vehicle.findOne({ where: { liscense_plate: value } });
            if ( vehicle ) {
                return Promise.reject( ValidationMessages.LicensePlateInUse );
            }
        });

    return isOptional 
        ? validator.optional() 
        : validator.not().isEmpty().withMessage(ValidationMessages.LicensePlateRequired);
};


const createVehicleValidator = () => [
    validateBrand(),
    validateVehicleTypeId(),
    validateContactId(true),
    validateLicensePlate(),
    validateColor(),
    validateDescription(),
    validateCreateUserId()
];

const updateVehicleValidator = () => [
    validateBrand(true),
    validateVehicleTypeId(true),
    validateContactId(true),
    validateLicensePlate(true),
    validateColor(true),
    validateDescription(true),
    validateUpdateUserId()
];

const getVehicleValidator = () => [
    validateVehicleId()
];

const searchValidator = () => [
    validateBrand(true),
    validateBrand(true),
    validateVehicleTypeId(true),
    validateContactId(true),
    validateLicensePlate(true),
    validateColor(true),
    validateDescription(true),
];

export { createVehicleValidator, updateVehicleValidator, getVehicleValidator, searchValidator };
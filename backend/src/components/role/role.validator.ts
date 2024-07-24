import { body, param } from 'express-validator';
import { Role } from '../../database/models/role.model';
import { ValidationMessages } from './validation.messages';

const validateRoleName = (isOptional = false) => {
    const validator = body('role_name')
        .trim()
        .isLength({ min: 3 })
        .withMessage(ValidationMessages.RoleNameMinLength)
        .isLength({ max: 50 })
        .withMessage(ValidationMessages.RoleNameMaxLength)
        .custom(async (value) => {
            const role = await Role.findOne({ where: { role_name: value } });
            if (role) {
                return Promise.reject(ValidationMessages.RoleNameInUse);
            }
        });

    return isOptional 
        ? validator.optional() 
        : validator.not().isEmpty().withMessage(ValidationMessages.RoleNameRequired);
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

const validateRoleId = () => {
    return body('role_id')
        .not().isEmpty()
        .withMessage(ValidationMessages.RoleIdRequired)
        .custom(async (value) => {
            const role = await Role.findByPk(value);
            if (!role) {
                return Promise.reject(ValidationMessages.RoleNotFound);
            }
        });
};

const createRoleValidator = () => [
    validateRoleName(),
    validateDescription()
];

const updateRoleValidator = () => [
    validateRoleId(),
    validateRoleName(true),
    validateDescription(true)
];

const getRoleValidator = () => [
    validateRoleId()
];

const searchValidator = () => [
    validateRoleName(true),
    validateDescription(true)
];

export { createRoleValidator, updateRoleValidator, getRoleValidator, searchValidator };
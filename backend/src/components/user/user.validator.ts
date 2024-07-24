import { body, param } from 'express-validator';
import { Role } from '../../database/models/role.model';
import { ValidationUserMessages } from './validation.messages';
import { User } from '../../database/models/user.model';

const validateIdentification = (isOptional = false) => {
    const validator = body('identification')
        .trim()
        .isLength({ min: 6 })
        .withMessage(ValidationUserMessages.IdentificationMinLength)
        .isLength({ max: 12 })
        .withMessage(ValidationUserMessages.IdentificationMaxLength);
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationUserMessages.IdentificationRequired);
};

const validateName = (isOptional = false) => {
    const validator = body('name')
        .trim()
        .isLength({ min: 5 })
        .withMessage(ValidationUserMessages.NameMinLength)
        .isLength({ max: 50 })
        .withMessage(ValidationUserMessages.NameMaxLength);
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationUserMessages.NameRequired);
};

const validateLastName = (isOptional = false) => {
    const validator = body('last_name')
        .trim()
        .isLength({ min: 5 })
        .withMessage(ValidationUserMessages.LastNameMinLength)
        .isLength({ max: 50 })
        .withMessage(ValidationUserMessages.LastNameMaxLength);
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationUserMessages.LastNameRequired);
};

const validateUsername = (isOptional = false) => {
    const validator = body('username')
        .trim()
        .isLength({ min: 3 })
        .withMessage(ValidationUserMessages.UsernameMinLength)
        .isLength({ max: 20 })
        .withMessage(ValidationUserMessages.UsernameMaxLength);
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationUserMessages.UsernameRequired);
};

const validateEmail = (isOptional = false) => {
    const validator = body('email')
        .trim()
        .isEmail()
        .withMessage(ValidationUserMessages.EmailInvalid);
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationUserMessages.EmailRequired);
};

const validatePassword = (isOptional = false) => {
    const validator = body('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage(ValidationUserMessages.PasswordMinLength);
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationUserMessages.PasswordRequired);
};

const validateRoleId = (isOptional = false) => {
    return body('role_id')
        .not().isEmpty()
        .withMessage(ValidationUserMessages.RoleIdRequired)
        .custom(async (value) => {
            const role = await Role.findByPk(value);
            if (!role) {
                return Promise.reject(ValidationUserMessages.RoleNotFound);
            }
        });
};

const validateUserId = () => {
    return param('id')
        .not().isEmpty()
        .withMessage(ValidationUserMessages.UserIdRequired)
        .custom(async (value) => {
            const user = await User.findByPk(value);
            if (!user) {
                return Promise.reject(ValidationUserMessages.UserNotFound);
            }
        });
};


const createUserValidator = () => [
    validateIdentification(),
    validateName(),
    validateLastName(),
    validateUsername(),
    validateEmail(),
    validatePassword(),
    validateRoleId()
];

const updateUserValidator = () => [
    validateUserId(),
    validateIdentification(true),
    validateName(true),
    validateLastName(true),
    validateUsername(true),
    validateEmail(true),
    validatePassword(true),
    validateRoleId(true)
];

const getUserValidator = () => [
    validateUserId()
];

const searchUserValidator = () => [
    validateIdentification(true),
    validateName(true),
    validateLastName(true),
    validateUsername(true),
    validateEmail(true)
];


export {
    createUserValidator,
    updateUserValidator,
    getUserValidator,
    searchUserValidator
};
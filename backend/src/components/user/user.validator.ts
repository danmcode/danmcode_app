import { body, param } from 'express-validator';
import { Role } from '../../database/models/role.model';
import { ValidationUserMessages } from './validation.messages';
import { User } from '../../database/models/user.model';
import { DropDownListItem } from '../../database/models';

const validateIdentification = (isOptional = false) => {
    const validator = body('identification')
        .trim()
        .isLength({ min: 6 })
        .withMessage(ValidationUserMessages.IdentificationMinLength)
        .isLength({ max: 12 })
        .withMessage(ValidationUserMessages.IdentificationMaxLength)
        .custom(async (value) => {
            const user = await User.findOne({ where: { identification: value } });
            if (user) {
                return Promise.reject(ValidationUserMessages.IdentificationInUse);
            }
        });
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
        .withMessage(ValidationUserMessages.UsernameMaxLength)
        .custom(async (value) => {
            const user = await User.findOne({ where: { username: value } });
            if (user) {
                return Promise.reject(ValidationUserMessages.UsernameInUse);
            }
        });
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationUserMessages.UsernameRequired);
};

const validateEmail = (isOptional = false) => {
    const validator = body('email')
        .trim()
        .isEmail()
        .withMessage(ValidationUserMessages.EmailInvalid)
        .custom(async (value) => {
            const user = await User.findOne({ where: { email: value } });
            if (user) {
                return Promise.reject(ValidationUserMessages.EmailInUse);
            }
        });
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
    const validator = body('role_id')
        .not().isEmpty()
        .withMessage(ValidationUserMessages.RoleIdRequired)
        .custom(async (value) => {
            const role = await Role.findByPk(value);
            if (!role) {
                return Promise.reject(ValidationUserMessages.RoleNotFound);
            }
        });
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationUserMessages.RoleIdRequired);
};

const validateIdentificationTypeId = (isOptional = false) => {
    const validator = body('identification_type_id')
        .custom(async (value) => {
            const identifiactionTypeId = await DropDownListItem.findByPk(value);
            if (!identifiactionTypeId) {
                return Promise.reject(ValidationUserMessages.IdentificationTypeNotFound);
            }
        });
    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationUserMessages.IdentificationTypeIdRequired);
};

const validateUserId = () => {
    return body('user_id')
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
    validateRoleId(),
    validateIdentificationTypeId()
];

const updateUserValidator = () => [
    validateUserId(),
    validateIdentification(true),
    validateName(true),
    validateLastName(true),
    validateUsername(true),
    validateEmail(true),
    validatePassword(true),
    validateRoleId(true),
    validateIdentificationTypeId(true)
];

const getUserValidator = () => [
    validateUserId()
];

const searchUserValidator = () => [
    validateIdentification(true),
    validateName(true),
    validateLastName(true),
    validateUsername(true),
    validateEmail(true),
    // validateIdentificationTypeId(true)
];


export {
    createUserValidator,
    updateUserValidator,
    getUserValidator,
    searchUserValidator
};
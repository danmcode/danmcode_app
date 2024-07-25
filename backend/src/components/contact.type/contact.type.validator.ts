import { body } from 'express-validator';
import { ValidationMessages } from './validation.messages';
import { ContactType } from '../../database/models/contact.type';
import { User } from '../../database/models/user.model';

const validateContactTypeName = (isOptional = false) => {
    const validator = body('contact_type')
        .trim()
        .isLength({ min: 3 })
        .withMessage(ValidationMessages.ContactTypeMinLength)
        .isLength({ max: 50 })
        .withMessage(ValidationMessages.ContactTypeMaxLength)
        .custom(async (value) => {
            const contactType = await ContactType.findOne({ where: { contact_type: value } });
            if (contactType) {
                return Promise.reject(ValidationMessages.ContactTypeInUse);
            }
        });

    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationMessages.ContactTypeRequired);
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

const validateContactTypeId = () => {
    return body('contact_type_id')
        .not().isEmpty()
        .withMessage(ValidationMessages.ContactTypeIdRequired)
        .custom(async (value) => {
            const contactType = await ContactType.findByPk(value);
            if (!contactType) {
                return Promise.reject(ValidationMessages.ContactTypeNotFound);
            }
        });
};

const validateUserId = () => {
    return body('created_by')
        .not().isEmpty()
        .withMessage(ValidationMessages.UserIdRequired)
        .custom(async (value) => {
            const contact = await User.findByPk(value);
            if (!contact) {
                return Promise.reject(ValidationMessages.UserNotFound);
            }
        });
};

const createContactTypeValidator = () => [
    validateContactTypeName(),
    validateDescription(),
    validateUserId()
];

const updateContactTypeValidator = () => [
    validateContactTypeId(),
    validateContactTypeName(true),
    validateDescription(true)
];

const getContactTypeValidator = () => [
    validateContactTypeId()
];

const searchValidator = () => [
    validateContactTypeName(true),
    validateDescription(true)
];

export { createContactTypeValidator, updateContactTypeValidator, getContactTypeValidator, searchValidator };
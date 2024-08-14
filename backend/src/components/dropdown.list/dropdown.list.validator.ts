import { body } from 'express-validator';
import { ValidationMessages } from './validation.messages';
import { DropDownList } from '../../database/models/dropdown.list';

const validateDropDownListName = (isOptional = false) => {
    const validator = body('list_name')
        .trim()
        .isLength({ min: 3 })
        .withMessage(ValidationMessages.DropDownListMinLength)
        .isLength({ max: 50 })
        .withMessage(ValidationMessages.DropDownListMaxLength)
        .custom(async (value) => {
            const clientType = await DropDownList.findOne({ where: { list_name: value } });
            if (clientType) {
                return Promise.reject(ValidationMessages.DropDownListInUse);
            }
        });

    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationMessages.DropDownListRequired);
};


const validateDropDownListId = () => {
    return body('list_name_id')
        .not().isEmpty()
        .withMessage(ValidationMessages.DropDownListIdRequired)
        .custom(async (value) => {
            const clientType = await DropDownList.findByPk(value);
            if (!clientType) {
                return Promise.reject(ValidationMessages.DropDownListNotFound);
            }
        });
};

const createDropDownListValidator = () => [
    validateDropDownListName(),
];

const updateDropDownListValidator = () => [
    validateDropDownListId(),
    validateDropDownListName(true),
];

const getDropDownListValidator = () => [
    validateDropDownListId()
];

const searchValidator = () => [
    validateDropDownListName(true),
];

export { createDropDownListValidator, updateDropDownListValidator, getDropDownListValidator, searchValidator };
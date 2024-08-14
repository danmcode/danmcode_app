import { body } from 'express-validator';
import { ValidationMessages } from './validation.messages';
import { DropDownListItem } from '../../database/models/dropdown.list.item';
import { validate } from 'uuid';
import { DropDownList } from '../../database/models/dropdown.list';

const validateDropDownListItemName = (isOptional = false) => {
    const validator = body('list_item_name')
        .trim()
        .isLength({ min: 3 })
        .withMessage(ValidationMessages.DropDownListItemMinLength)
        .isLength({ max: 50 })
        .withMessage(ValidationMessages.DropDownListItemMaxLength)
        .custom(async (value) => {
            const listName = await DropDownListItem.findOne({ where: { list_item_name: value } });
            if (listName) {
                return Promise.reject(ValidationMessages.DropDownListItemInUse);
            }
        });

    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationMessages.DropDownListItemRequired);
};


const validateDropDownListId = (isOptional = false) => {
    const validator = body('list_id')
        .custom(async (value) => {
            const dropDownListId = await DropDownList.findByPk(value);
            if (!dropDownListId) {
                return Promise.reject(ValidationMessages.DropDownListNotFound);
            }
        });

    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationMessages.DropDownListIdRequired)
};

const validateDropDownListItemId = () => {
    return body('list_item_id')
        .not().isEmpty()
        .withMessage(ValidationMessages.DropDownListItemIdRequired)
        .custom(async (value) => {
            const dropDownListItemId = await DropDownListItem.findByPk(value);
            if (!dropDownListItemId) {
                return Promise.reject(ValidationMessages.DropDownListItemNotFound);
            }
        });
};

const validateDescription = (isOptional = false) => {
    const validator = body('description')
        .trim()
        .isLength({ min: 10 })
        .withMessage(ValidationMessages.DescriptionMinLength)
        .isLength({ max: 50 })
        .withMessage(ValidationMessages.DescriptionMaxLength);

    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationMessages.DescriptionRequired);
};

const createDropDownListItemValidator = () => [
    validateDropDownListItemName(),
    validateDescription(),
    validateDropDownListId(),
];

const updateDropDownListItemValidator = () => [
    validateDropDownListItemId(),
    validateDescription(),
    validateDropDownListItemName(true),
    validateDropDownListId(true),
];

const getDropDownListItemValidator = () => [
    validateDropDownListItemId()
];

const searchValidator = () => [
    validateDropDownListItemName(true),
];

export { createDropDownListItemValidator, updateDropDownListItemValidator, getDropDownListItemValidator, searchValidator };
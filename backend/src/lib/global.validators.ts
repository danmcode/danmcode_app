import { body } from "express-validator";
import { User } from "../database/models/user.model";
import { Client } from "../database/models/client.model";
import { ValidationMessages } from "../components/role/validation.messages";
import { GlobalValidationMessages } from "./global.validation.message";
import { JobTitle } from "../database/models/job.titles.model";
import { DropDownListItem } from "../database/models";
import { SubLocation } from "../database/models/sub.location";
import { Contact } from "../database/models/contact";

const validateCreateUserId = (
    isEmptyMessage: string,
    notFoundMessage: string,
) => {
    return body('created_by')
        .not().isEmpty().withMessage(isEmptyMessage)
        .custom(async (value) => {
            const location = await User.findByPk(value);
            if (!location) {
                return Promise.reject(notFoundMessage);
            }
        });
};

const validateUpdateUserId = (
    isEmptyMessage: string,
    notFoundMessage: string,
) => {
    return body('updated_by')
        .not().isEmpty().withMessage(isEmptyMessage)
        .custom(async (value) => {
            const location = await User.findByPk(value);
            if (!location) {
                return Promise.reject(notFoundMessage);
            }
        });
};

const validateClientId = ( 
    isOptional = false, 
    isEmptyMessage: string,
    notFoundMessage: string,
) => {
    const validator = body('client_id')
        .custom(async (value) => {
            const client = await Client.findByPk(value);
            if (!client) {
                return Promise.reject(isEmptyMessage);
            }
        });

    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(notFoundMessage)
};

const validateSubLocationId = ( isOptional = false ) => {
    const validator = body('sub_location_id')
        .custom(async (value) => {
            const client = await SubLocation.findByPk(value);
            if (!client) {
                return Promise.reject(GlobalValidationMessages.SubLocationNotFound);
            }
        });

    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(GlobalValidationMessages.SubLocationIdRequired)
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

const validateJobTitleId = () => {
    return body('job_title_id')
        .not().isEmpty()
        .withMessage(GlobalValidationMessages.JobTitleIdRequired)
        .custom(async (value) => {
            const jobTitle = await JobTitle.findByPk(value);
            if (!jobTitle) {
                return Promise.reject(GlobalValidationMessages.JobTitleNotFound);
            }
        });
};

const validateContactTypeId = () => {
    return body('contact_type_id')
        .not().isEmpty()
        .withMessage(GlobalValidationMessages.ContactTypeIdRequired)
        .custom(async (value) => {
            const ContactType = await DropDownListItem.findByPk(value);
            if (!ContactType) {
                return Promise.reject(GlobalValidationMessages.ContactTypeNotFound);
            }
        });
};

const validateResidentTypeId = () => {
    return body('resident_type_id')
        .not().isEmpty()
        .withMessage(GlobalValidationMessages.ResidentTypeIdRequired)
        .custom(async (value) => {
            const residentType = await DropDownListItem.findByPk(value);
            if (!residentType) {
                return Promise.reject(GlobalValidationMessages.ResidentTypeNotFound);
            }
        });
};

const validateContactId = () => {
    return body('contact_id')
        .not().isEmpty()
        .withMessage(GlobalValidationMessages.ContactIdRequired)
        .custom(async (value) => {
            const contact  = await Contact.findByPk(value);
            if (!contact ) {
                return Promise.reject(GlobalValidationMessages.ContactNotFound);
            }
        });
};

export { 
    validateCreateUserId, 
    validateUpdateUserId, 
    validateClientId,
    validateDescription,
    validateJobTitleId,
    validateContactTypeId,
    validateResidentTypeId,
    validateSubLocationId,
    validateContactId,
}
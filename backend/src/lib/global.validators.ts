import { body } from "express-validator";
import { User } from "../database/models/user.model";
import { Client } from "../database/models/client.model";
import { ValidationMessages } from "../components/role/validation.messages";
import { GlobalValidationMessages } from "./global.validation.message";
import { JobTitle } from "../database/models/job.titles.model";
import { DropDownListItem } from "../database/models";
import { SubLocation } from "../database/models/sub.location";
import { Contact } from "../database/models/contact";

const validateCreateUserId = () => {
    return body('created_by')
        .isUUID().withMessage(GlobalValidationMessages.InvalidId)
        .not().isEmpty().withMessage(GlobalValidationMessages.UserIdCreatedRequired)
        .custom(async (value) => {
            const location = await User.findByPk(value);
            if (!location) {
                return Promise.reject(GlobalValidationMessages.UserCreatedNotFound);
            }
        });
};

const validateUpdateUserId = () => {
    return body('updated_by')
        .not().isEmpty().withMessage(GlobalValidationMessages.UserIdUpdatedRequired)
        .isUUID().withMessage(GlobalValidationMessages.InvalidId)
        .custom(async (value) => {
            const location = await User.findByPk(value);
            if (!location) {
                return Promise.reject(GlobalValidationMessages.UserUpdatedNotFound);
            }
        });
};

const validateClientId = (isOptional = false) => {
    const validator = body('client_id')
        .isUUID().withMessage(GlobalValidationMessages.InvalidId)
        .custom(async (value) => {
            const client = await Client.findByPk(value);
            if (!client) {
                return Promise.reject(GlobalValidationMessages.ClientNotFound);
            }
        });

    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(GlobalValidationMessages.ClientIdRequired)
};

const validateSubLocationId = (isOptional = false) => {
    const validator = body('sub_location_id')
        .isUUID().withMessage(GlobalValidationMessages.InvalidId)
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

const validateJobTitleId = (isOptional = true) => {
    const validator = body('job_title_id')
        .isUUID().withMessage(GlobalValidationMessages.InvalidId)
        .custom(async (value) => {
            const jobTitle = await JobTitle.findByPk(value);
            if (!jobTitle) {
                return Promise.reject(GlobalValidationMessages.JobTitleNotFound);
            }
        });

    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(GlobalValidationMessages.JobTitleIdRequired)
};

const validateContactTypeId = (isOptional = false) => {
    const validator = body('contact_type_id')
        .isUUID().withMessage(GlobalValidationMessages.InvalidId)
        .custom(async (value) => {
            const ContactType = await DropDownListItem.findByPk(value);
            if (!ContactType) {
                return Promise.reject(GlobalValidationMessages.ContactTypeNotFound);
            }
        });

    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(GlobalValidationMessages.ContactTypeIdRequired)

};

const validateResidentTypeId = (isOptional = false) => {
    const validator = body('resident_type_id')
        .isUUID().withMessage(GlobalValidationMessages.InvalidId)
        .custom(async (value) => {
            const residentType = await DropDownListItem.findByPk(value);
            if (!residentType) {
                return Promise.reject(GlobalValidationMessages.ResidentTypeNotFound);
            }
        });

    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(GlobalValidationMessages.ResidentTypeIdRequired)
};

const validateContactId = () => {
    return body('contact_id')
        .not().isEmpty()
        .withMessage(GlobalValidationMessages.ContactIdRequired)
        .isUUID().withMessage(GlobalValidationMessages.InvalidId)
        .custom(async (value) => {
            const contact = await Contact.findByPk(value);
            if (!contact) {
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
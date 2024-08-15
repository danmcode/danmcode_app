import { body } from "express-validator";
import { User } from "../database/models/user.model";
import { Client } from "../database/models/client.model";
import { ValidationMessages } from "../components/role/validation.messages";
import { GlobalValidationMessages } from "./global.validation.message";
import { JobTitle } from "../database/models/job.titles.model";

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

export { 
    validateCreateUserId, 
    validateUpdateUserId, 
    validateClientId,
    validateDescription,
    validateJobTitleId
}
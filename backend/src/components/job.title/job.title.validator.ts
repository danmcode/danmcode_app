import { body, param } from 'express-validator';
import { ValidationMessages } from './validation.messages';
import { JobTitle } from '../../database/models/job.titles.model';
import { Client } from '../../database/models/client.model';
import { User } from '../../database/models/user.model';
import { validateClientId, validateCreateUserId, validateDescription, validateJobTitleId, validateUpdateUserId } from '../../lib/global.validators';

const validateJobTitleName = (isOptional = false) => {

    const validator = body('job_title')
        .trim()
        .isLength({ min: 3 })
        .withMessage(ValidationMessages.JobTitleMinLength)
        .isLength({ max: 50 })
        .withMessage(ValidationMessages.JobTitleMaxLength)
        .custom(async (value) => {
            const jobTitle = await JobTitle.findOne({ where: { job_title: value } });
            if (jobTitle) {
                return Promise.reject(ValidationMessages.JobTitleInUse);
            }
        });

    return isOptional
        ? validator.optional()
        : validator.not().isEmpty().withMessage(ValidationMessages.JobTitleRequired);
};

const createJobTitleValidator = () => [
    validateJobTitleName(),
    validateDescription(),
    validateClientId(false),
    validateCreateUserId()
];

const updateJobTitleValidator = () => [
    validateJobTitleId(),
    validateJobTitleName(true),
    validateDescription(true),
    validateClientId(true),
    validateUpdateUserId()
];

const getJobTitleValidator = () => [
    validateJobTitleId()
];

const searchValidator = () => [
    validateJobTitleName(true),
    validateDescription(true)
];

export { createJobTitleValidator, updateJobTitleValidator, getJobTitleValidator, searchValidator };
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import { create } from 'lodash';
import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators';

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        studentName: Joi.string().required().min(3).max(256).trim().strict(),
        // studentPassword: Joi.string().required().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE).trim(),
        studentPhone: Joi.string().length(10).pattern(/^[0-9]+$/),
        studentWorkplace: Joi.string().required().min(3).max(256).trim().strict(),
        studentObject:Joi.string().required().valid('Học sinh', 'Sinh viên', 'Người đi làm'),
        studentLevel:Joi.string().required().valid('Chưa biết gì', 'Tương đối hiểu biết', 'Hiểu biết', 'Chuyên gia'),
        studentOutput: Joi.string().required().default('')
    })
    try {
        await correctCondition.validateAsync(req.body, {
            abortEarly: false
        })
        next()
    }
    catch(error) {
        const errorMessage = new Error(error).message
        const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
        next(customError)
    }
}

export const studentValidation = {
    createNew
}
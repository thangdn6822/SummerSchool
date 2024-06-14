import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import { create } from 'lodash';
import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators';

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE).trim(),
        role: Joi.string().valid(
            'god',
            'staff'
        ).required()
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

export const userValidation = {
    createNew
}
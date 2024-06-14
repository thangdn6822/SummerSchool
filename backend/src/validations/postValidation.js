import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import { create } from 'lodash';

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(256).trim().strict(),
        desc: Joi.string().required().trim().strict(),
        content: Joi.string().required().trim().strict(),
        price: Joi.string().required().trim().strict(),
        lecturer:Joi.string().required().trim().strict().default('Đỗ Như Thắng'),
        category: Joi.string().default('uncategorized'),
        image: Joi.string().required().default('')
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
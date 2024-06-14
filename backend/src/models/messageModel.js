import Joi from 'joi';
import { GET_DB } from '~/config/mongodb';

const MESSAGE_COLLECTION_NAME = 'messages'
const MESSAGE_COLLECTION_SCHEMA = Joi.object({
    chatId: Joi.string().required().min(3).max(256).trim().strict(),
    senderId: Joi.string().required().min(3).max(256).trim().strict(),
    content: Joi.string().required().trim().strict(),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
    return await MESSAGE_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}


const createNew = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)
        const createdMessage = await GET_DB().collection(MESSAGE_COLLECTION_NAME).insertOne(validData)
        return createdMessage
    }
    catch (error) {
        throw new Error(error)
    }
}


const findOneById = async (chatId) => {
    try {
        const result = await GET_DB().collection(MESSAGE_COLLECTION_NAME).findOne({
            chatId: chatId
        })
        return result
    }
    catch(error) {
        throw new Error(error)
    }
}


const getMessages = async (chatId) => {
    const message = await GET_DB().collection(MESSAGE_COLLECTION_NAME).findOne({
        chatId: chatId
    })
    return message
}


export const messageModel = {
    MESSAGE_COLLECTION_NAME,
    MESSAGE_COLLECTION_SCHEMA,
    createNew,
    getMessages,
    findOneById
}

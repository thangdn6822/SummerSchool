import { messageModel } from '~/models/messageModel'


const createNew = async (reqBody) => {
    try {
        const newMessage = {
            ...reqBody
        }
        const createdMessage = await messageModel.createNew(newMessage)
        const getNewMessage = await messageModel.findOneById(createdMessage.insertedId)
        return getNewMessage
    }
    catch(error) {
        throw new Error(error)
    }
}


const getMessages = async (chatId) => {
    try {
        const messagesData = await messageModel.getMessages(chatId)
        return messagesData
    } 
    catch(error) {
        throw new Error(error)
    }
}

export const messageService = {
    createNew,
    getMessages
}

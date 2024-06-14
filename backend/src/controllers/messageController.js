import { StatusCodes } from 'http-status-codes'
import { messageService } from '~/services/messageService'

const createNew = async (req, res, next) => {
    try {
        const createdMessage = await messageService.createNew(req.body)
        console.log('req.body: ', req.body)
        res.status(StatusCodes.CREATED).json(createdMessage)

    }
    catch(error) {
        next(error)
    }
}

const getMessages = async (req, res, next) => {
    try {
    const chatId = req.params.id
    const messagesData = await messageService.getMessages(chatId)
    res.status(StatusCodes.OK).json(messagesData)
    }
    catch(error) {
        next(error)
    }
}

export const messageController = {
    createNew,
    getMessages
}
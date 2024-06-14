import express from 'express'
import { messageController } from '~/controllers/messageController'
const Router = express.Router()

Router.route('/create').post(messageController.createNew)

Router.route('/:chatId').get(messageController.getMessages)


export const messageRoute = Router
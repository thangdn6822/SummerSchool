import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { commentValidation } from '~/validations/commentValidation'
import { commentController } from '~/controllers/commentController'
const Router = express.Router()

Router.route('/create').post(commentController.createNew)

Router.route('/getPostComments/:postId').get(commentController.getPostComments)

Router.route('/likeComment/:commentId').put(commentController.likeComment)

Router.route('/editComment/:commentId').put(commentController.editComment)

Router.route('deleteComment/:commentId').delete(commentController.deleteComment)

Router.route('/getComments').get(commentController.getComments)


export const commentRoute = Router
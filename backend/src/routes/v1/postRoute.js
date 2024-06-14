import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { postValidation } from '~/validations/postValidation'
import { postController } from '~/controllers/postController'
import { verifyToken } from '~/utils/verifyUser'
const Router = express.Router()


Router.route('/create').post(postController.createNew)
Router.route('/getposts').get(postController.getPosts)
Router.route('/deletepost/:postId/:userId').delete(postController.deletePost)
Router.route('/updatepost/:postId/:userId').put(postController.updatePost)


export const postRoute = Router
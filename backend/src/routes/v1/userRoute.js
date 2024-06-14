import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userValidation } from '~/validations/userValidation'
import { userController } from '~/controllers/userController'
const Router = express.Router()

Router.route('/signup').post(userValidation.createNew, userController.signup)

Router.route('/signin').post(userController.signin)

// Router.route('/test').get(userController.test)

Router.route('/update/:userId').put(userController.updateUser)

Router.route('/delete/:userId').delete(userController.deleteUser)

Router.route('/getusers').get(userController.getUsers)

Router.route('/:userId').get(userController.getUser)

// Router.route('getUsers').get(userController.getUsers)


export const userRoute = Router
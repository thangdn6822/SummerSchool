import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { studentValidation } from '~/validations/studentValidation'
import { studentController } from '~/controllers/studentController'
const Router = express.Router()

Router.route('/').post(studentValidation.createNew, studentController.createNew)

// Router.route('/signup').post(studentController.signup)

// Router.route('/signin').post(studentController.signin)

// Router.route('/:id').get(studentController.getDetails)

Router.route('/getstudents').get(studentController.getStudents)

export const studentRoute = Router
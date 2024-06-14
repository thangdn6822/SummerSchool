import express from 'express'
import { newController } from '~/controllers/newController'
import { verifyToken } from '~/utils/verifyUser'
const Router = express.Router()


Router.route('/create').post(newController.createNew)
Router.route('/getnews').get(newController.getNews)
Router.route('/deletenew/:newId/:userId').delete(newController.deleteNew)
Router.route('/updatenew/:newId/:userId').put(newController.updateNew)


export const newRoute = Router
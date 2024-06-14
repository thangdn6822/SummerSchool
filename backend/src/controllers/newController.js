import { StatusCodes } from 'http-status-codes'
import { newService } from '~/services/newService'


const createNew = async (req, res, next) => {
    try {
        const createdNew = await newService.createNew(req.body)
        console.log('req.body: ', req.body)
        res.status(StatusCodes.CREATED).json(createdNew)

    }
    catch(error) {
        next(error)
    }
}

const getNews = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'desc' ? -1 : 1;

        const userId = req.query.userId;
        const slug = req.query.slug;
        const newId = req.query.newId;
        const searchTerm = req.query.searchTerm;
        const filters = { userId, slug, newId, searchTerm };

        const newsData = await newService.getNews(filters, startIndex, limit, sortDirection);
        res.status(StatusCodes.OK).json(newsData);
    }
    catch(error) {
        next(error)
    }
}


const updateNew = async (req, res, next) => {
    try {
        const newId = req.params.id
        const updatedNew = await newService.updateNew(newId, req.body)
        res.status(StatusCodes.OK).json(updatedNew)
    } catch(error) {
        next(error)
    }
}

const deleteNew = async (req, res, next) => {
    try {
        const newId = req.params.id
        const result = await newService.deleteNew(newId)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

export const newController = {
    createNew,
    getNews,
    deleteNew,
    updateNew

}
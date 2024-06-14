import { slugify } from '~/utils/formatters'
import { newModel } from '~/models/newModel'


const createNew = async (reqBody) => {
    try {
        
        const newNew = {
            ...reqBody,
            slug: slugify(reqBody.title)
        }

        const createdNew = await newModel.createNew(newNew)
        
        const getNew = await newModel.findOneById(createdNew.insertedId)
        return getNew
    }
    catch(error) {
        throw new Error(error)
    }
}

const updateNew = async (newId, reqBody) => {
    try {
        const updateData = {
            ...reqBody,
            updateAt: Date.now()
        }
        const updateNew = await newModel.updateNew(newId, updateData)
        return updateNew
    }
    catch(error) {
        throw new Error(error)
    }
}

const deleteNew = async (newId) => {
    try {
        await newModel.deleteNew(newId)
        return {
            deleteResult: 'Post deleted successfully!'
        }
    }
    catch(error) {
            throw new Error(error)
    }
}

const getNews = async (filters, startIndex, limit, sortDirection) => {
    try {
        const newsData = await newModel.getNews(filters, startIndex, limit, sortDirection);
        return newsData;
      } catch (error) {
        throw new Error(error);
      }
}



export const newService = {
    createNew,
    updateNew,
    getNews,
    deleteNew
}

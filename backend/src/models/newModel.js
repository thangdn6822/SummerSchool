import Joi from 'joi';
import { update } from 'lodash';
import { ObjectId, ReturnDocument } from 'mongodb';
import { GET_DB } from '~/config/mongodb';



const NEW_COLLECTION_NAME = 'news'
const NEW_COLLECTION_SCHEMA = Joi.object({
    userId: Joi.string().required().min(3).max(256).trim().strict(),
    title: Joi.string().required().min(3).max(256).trim().strict(),
    content: Joi.string().required().trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    image: Joi.string().required().default('https://www.fit.uet.vnu.edu.vn/wp-content/uploads/2022/05/mau-thong-bao_2204184241.png'),

    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})


const validateBeforeCreate = async (data) => {
    return await NEW_COLLECTION_SCHEMA.validateAsync(data, {abortEarly: false})
}

const createNew = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)
        const createdNew = await GET_DB().collection(NEW_COLLECTION_NAME).insertOne(validData)
        return createdNew
    }
    catch(error) {
        throw new Error(error)
    }
}

const getNews = async (filters, startIndex, limit, sortDirection) => {
    try {
        const { userId, slug, newId, searchTerm } = filters;
        const filter = {
        ...(userId && { userId }),
        ...(slug && { slug }),
        ...(newId && { _id: newId }),
        ...(searchTerm && {
          $or: [
            { title: { $regex: searchTerm, $options: 'i' } },
            { content: { $regex: searchTerm, $options: 'i' } },
          ],
        }),
      };
      const news = await GET_DB().collection(NEW_COLLECTION_NAME).find(filter)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .toArray();
      const totalNews = await GET_DB().collection(NEW_COLLECTION_NAME).countDocuments();
  const now = new Date();
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const lastMonthNews = await GET_DB().collection(NEW_COLLECTION_NAME).countDocuments({
    createdAt: { $gte: oneMonthAgo }
  });

  return { news, totalNews, lastMonthNews };
  

    }
    catch(error) {
        throw new Error(error)
    }
}

const updateNew = async (newId, updateData) => {
    try {
        const result = await GET_DB().collection(NEW_COLLECTION_NAME).findOneAndUpdate(
            {
                _id: new ObjectId(newId)
            },
            {
                $set: updateData
            },
            {
                returnDocument: 'after'
            }
        )
        return result
    }
    catch(error) {
        throw new Error(error)
    }
}

const deleteNew = async (newId) => {
    try {
        const result = await GET_DB().collection(NEW_COLLECTION_NAME).deleteOne({
            _id: new ObjectId(newId)
        })
        return result
    }
    catch(error) {
        throw new Error(error)
    }
}

export const newModel = {
    NEW_COLLECTION_NAME,
    NEW_COLLECTION_SCHEMA,
    createNew,
    getNews,
    updateNew,
    deleteNew
}
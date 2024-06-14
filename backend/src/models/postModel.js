import Joi from 'joi';
import { update } from 'lodash';
import { ObjectId, ReturnDocument } from 'mongodb';
import { GET_DB } from '~/config/mongodb';



const POST_COLLECTION_NAME = 'posts'
const POST_COLLECTION_SCHEMA = Joi.object({
    userId: Joi.string().required().min(3).max(256).trim().strict(),
    title: Joi.string().required().min(3).max(256).trim().strict(),
    desc: Joi.string().required().trim().strict(),
    content: Joi.string().required().trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    price: Joi.string().required().trim().strict(),
    lecturer:Joi.string().required().trim().strict().default('Đỗ Như Thắng'),
    category: Joi.string().default('uncategorized'),
    image: Joi.string().required().default('https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png'),

    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})


const validateBeforeCreate = async (data) => {
    return await POST_COLLECTION_SCHEMA.validateAsync(data, {abortEarly: false})
}

const createNew = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)
        const createdPost = await GET_DB().collection(POST_COLLECTION_NAME).insertOne(validData)
        return createdPost
    }
    catch(error) {
        throw new Error(error)
    }
}

const getPosts = async (filters, startIndex, limit, sortDirection) => {
    try {
        const { userId, category, slug, postId, searchTerm } = filters;
        const filter = {
        ...(userId && { userId }),
        ...(category && { category }),
        ...(slug && { slug }),
        ...(postId && { _id: postId }),
        ...(searchTerm && {
          $or: [
            { title: { $regex: searchTerm, $options: 'i' } },
            { content: { $regex: searchTerm, $options: 'i' } },
          ],
        }),
      };
      const posts = await GET_DB().collection(POST_COLLECTION_NAME).find(filter)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .toArray();
      const totalPosts = await GET_DB().collection(POST_COLLECTION_NAME).countDocuments();
  const now = new Date();
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const lastMonthPosts = await GET_DB().collection(POST_COLLECTION_NAME).countDocuments({
    createdAt: { $gte: oneMonthAgo }
  });

  return { posts, totalPosts, lastMonthPosts };
  

    }
    catch(error) {
        throw new Error(error)
    }
}

const updatePost = async (postId, updateData) => {
    try {
        const result = await GET_DB().collection(POST_COLLECTION_NAME).findOneAndUpdate(
            {
                _id: new ObjectId(postId)
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

const deletePost = async (postId) => {
    try {
        const result = await GET_DB().collection(POST_COLLECTION_NAME).deleteOne({
            _id: new ObjectId(postId)
        })
        return result
    }
    catch(error) {
        throw new Error(error)
    }
}

export const postModel = {
    POST_COLLECTION_NAME,
    POST_COLLECTION_SCHEMA,
    createNew,
    getPosts,
    updatePost,
    deletePost
}
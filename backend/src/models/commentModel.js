import Joi from 'joi';
import { update } from 'lodash';
import { ObjectId } from 'mongodb';
import { GET_DB } from '~/config/mongodb';



const COMMENT_COLLECTION_NAME = 'comments'
const COMMENT_COLLECTION_SCHEMA = Joi.object({
    content: Joi.string().required().trim().strict(),
    postId: Joi.string().required().min(3).max(256).trim().strict(),
    userId: Joi.string().required().min(3).max(256).trim().strict(),
    likes: Joi.array().default([]),
    numberOfLikes:Joi.number().default(0),
    numberOfViews: Joi.number().default(0),

    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
    return await COMMENT_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}


const createNew = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)
        const createdComment = await GET_DB().collection(COMMENT_COLLECTION_NAME).insertOne(validData)
        return createdComment
    }
    catch (error) {
        throw new Error(error)
    }
}



const getPostComments = async (postId) => {
    try {
        const result = await GET_DB().collection(COMMENT_COLLECTION_NAME).findOne({
            postId: postId
        }).sort({ createdAt: -1 }).toArray();
        return result
    }
    catch(error) {
        throw new Error(error)
    }
}


const likeComment = async (commentId) => {
    try {
        const result = await GET_DB().collection(COMMENT_COLLECTION_NAME).findOne({
            commentId: commentId
        })
        return result
    }
    catch(error) {
        throw new Error(error)
    }
}


const editComment = async (commentId, editData) => {
    try {
        const result = await GET_DB().collection(COMMENT_COLLECTION_NAME).findOneAndUpdate({
            commentId: commentId
        },
        {
            $set: editData
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

const deleteComment = async (commentId) => {
    try {
        const result = await GET_DB().collection(COMMENT_COLLECTION_NAME).deleteOne({
            commentId: commentId
        })
        return result
    }
    catch(error) {
        throw new Error(error)
    }
}

const getComments = async (commentId, startIndex, limit, sortDirection) => {
    const comment = await GET_DB().collection(COMMENT_COLLECTION_NAME).findone({
        commentId: commentId
    })
    .sort({createdAt: sortDirection})
    .skip(startIndex)
    .limit(limit)
    .toArray()

    const totalComments = await GET_DB().collection(COMMENT_COLLECTION_NAME).countDocuments();
    const now = new Date()
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
    const lastMonthComments = await GET_DB().collection(COMMENT_COLLECTION_NAME).countDocuments({
        createdAt: { $gte: oneMonthAgo}
    })

    return {comment, totalComments, lastMonthComments}
}




export const commentModel = {
    COMMENT_COLLECTION_NAME,
    COMMENT_COLLECTION_SCHEMA,
    createNew,
    getPostComments,
    likeComment,
    editComment,
    deleteComment,
    getComments

}

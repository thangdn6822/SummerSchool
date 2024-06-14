import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'
import { postModel } from '~/models/postModel'



const createNew = async (reqBody) => {
    
    try {
        
        const newPost = {
            ...reqBody,
            slug: slugify(reqBody.title),
            // userId: reqBody.user.id
        }

        const createdPost = await postModel.createNew(newPost)
        
        const getNewPost = await postModel.findOneById(createdPost.insertedId)
        return getNewPost
    }
    catch(error) {
        throw new Error(error)
    }
}

const updatePost = async (postId, reqBody) => {
    try {
        const updateData = {
            ...reqBody,
            updateAt: Date.now()
        }
        const updatePost = await postModel.updatePost(postId, updateData)
        return updatePost
    }
    catch(error) {
        throw new Error(error)
    }
}

const deletePost = async (postId) => {
    try {
        await postModel.deletePost(postId)
        return {
            deleteResult: 'Post deleted successfully!'
        }
    }
    catch(error) {
            throw new Error(error)
    }
}

const getPosts = async (filters, startIndex, limit, sortDirection) => {
    try {
        const postsData = await postModel.getPosts(filters, startIndex, limit, sortDirection);
        return postsData;
      } catch (error) {
        throw new Error(error);
      }
}



export const postService = {
    createNew,
    updatePost,
    getPosts,
    deletePost
}

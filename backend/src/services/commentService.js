import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import commentModel from '~/models/commentModel'

const createNew = async (reqBody) => {
    try {
        const newComment = {
            ...reqBody
        }

        const createdComment = await commentModel.createNew(newComment)
        const getNewComment = await commentModel.findOneById(createdComment.insertedId)
        return getNewComment
    }
    catch(error) {
        throw new Error(error)
    }
}

const getPostComments = async (postId) => {
    try {
            const comment = await commentModel.getPostComments(postId)
            if (!comment) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Student Not Found!')
            }
            return comment
        }
        catch (error) {
            throw new Error(error)
        }
}

const likeComment = async (commentId, reqBody) => {
    try {
        const comment = await commentModel.likeComment(commentId)
        if (!comment) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Comment Not Found!')
        }
        const userIndex = comment.likes.indexOf(reqBody.user.id)
        if (userIndex === -1) {
            comment.numberOfLikes += 1;
            comment.likes.splice(reqBody.user.id)
        }
        else {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1)
        }

    }
    catch(error) {
        throw new Error(error)
    }
}

const editComment = async (commentId, reqBody) => {
    try {
        const comment = await commentModel.editComment(commentId)
        if (!comment) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Comment Not Found!')
        }

        if(comment.userId !== reqBody.user.id) {
            throw new ApiError(StatusCodes.FORBIDDEN, 'You are not allowed to edit this comment!')
        }


        const editData = {
            ...reqBody,
            updatedAt: Date.now()
        }

        const editedComment = await commentModel.editComment(commentId, editData)

        return editedComment
    }
    catch(error) {
        throw new Error(error)
    }
}

const deleteComment = async (commentId, reqBody) => {
    try {
        const comment = await commentModel.findOneById(commentId)
        if (!comment) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Comment Not Found!')
        }
        if(comment.userId !== reqBody.user.id) {
            throw new ApiError(StatusCodes.FORBIDDEN, 'You are not allowed to edit this comment!')
        }
        await commentModel.deleteOneById(commentId)
    }
    catch(error) {
        throw new Error(error)
    }
}

const getComments = async (commentId, startIndex, limit, sortDirection) => {
    try {
        const commentsData = await commentModel.getComments(commentId, startIndex, limit, sortDirection)
        return commentsData
    } 
    catch(error) {
        throw new Error(error)
    }
}

export const commentService = {
    createNew,
    getPostComments,
    likeComment,
    editComment,
    deleteComment,
    getComments
}

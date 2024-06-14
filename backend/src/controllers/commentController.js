import { StatusCodes } from 'http-status-codes'
import { update } from 'lodash'
import { commentService } from '~/services/commentService'

const createNew = async (req, res, next) => {
    try {
        const createdComment = await commentService.createNew(req.body)
        console.log('req.body: ', req.body)
        res.status(StatusCodes.CREATED).json(createdComment)

    }
    catch(error) {
        next(error)
    }
}

const getPostComments = async (req, res, next) => {
    try {
        const postId = req.params.id
        const comment = await commentService.getDetails(postId)

        res.status(StatusCodes.OK).json(comment)
    }
    catch(error) {
        next(error)
    }
}

const likeComment = async (req, res, next) => {
    try {
        const commentId = req.params.id
        const comment = await commentService.likeComment(commentId, req.body)
        res.status(StatusCodes.OK).json(comment)
    }
    catch (error) {
        next(error)
    }
}

const editComment =  async (req, res, next) => {
    try {
        const commentId = req.params.id
    const editedComment = await commentService.editComment(commentId, req.body)

    res.status(StatusCodes.OK).json(editedComment)
    }
    catch(error) {
        next(error)
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.id
        await commentService.deleteComment(commentId)

        res.status(StatusCodes.OK).json({message: 'Comment has been deleted!'})
    }
    catch (error) {
        next(error)
    }
}

const getComments = async (req, res, next) => {
    try {
    const commentId = req.params.id
    const startIndex = parseInt(req.query.startIndex) || 0
    const limit = parseInt(req.query.limit) || 9
    const sortDirection = req.query.sort === 'desc' ? -1 : 1;
    const commentsData = await commentService.getComments(commentId, startIndex, limit, sortDirection)
    res.status(StatusCodes.OK).json(commentsData)
    }
    catch(error) {
        next(error)
    }
}

export const commentController = {
    createNew,
    getPostComments,
    likeComment,
    editComment,
    deleteComment,
    getComments 

}
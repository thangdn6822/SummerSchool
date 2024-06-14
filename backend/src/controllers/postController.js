import { StatusCodes } from 'http-status-codes'
import { update } from 'lodash'
import { postService } from '~/services/postService'


const createNew = async (req, res, next) => {
    try {
        const createdPost = await postService.createNew(req.body)
        console.log('req.body: ', req.body)
        res.status(StatusCodes.CREATED).json(createdPost)

    }
    catch(error) {
        next(error)
    }
}

const getPosts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'desc' ? -1 : 1;

        const userId = req.query.userId;
        const category = req.query.category;
        const slug = req.query.slug;
        const postId = req.query.postId;
        const searchTerm = req.query.searchTerm;
        const filters = { userId, category, slug, postId, searchTerm };

        const postsData = await postService.getPosts(filters, startIndex, limit, sortDirection);
        res.status(StatusCodes.OK).json(postsData);
    }
    catch(error) {
        next(error)
    }
}


const updatePost = async (req, res, next) => {
    try {
        const postId = req.params.id
        const updatedPost = await postService.updatePost(postId, req.body)
        res.status(StatusCodes.OK).json(updatedPost)
    } catch(error) {
        next(error)
    }
}

const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id
        const result = await postService.deletePost(postId)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

export const postController = {
    createNew,
    getPosts,
    deletePost,
    updatePost

}
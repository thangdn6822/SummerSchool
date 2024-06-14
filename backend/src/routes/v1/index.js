import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { studentRoute } from './studentRoute'
import { postRoute } from './postRoute'
import { commentRoute } from './commentRoute'
import { userRoute } from './userRoute'
import { messageRoute } from './messageRoute'
import { newRoute } from './newRoute'

const router = express.Router()


router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({message: 'APIs V1 are ready to use!'})
})

router.use('/students', studentRoute)


router.use('/posts', postRoute)

router.use('/news', newRoute)

router.use('/comments', commentRoute)

router.use('/users', userRoute)

router.use('/messages', messageRoute)


export const APIs_V1 = router

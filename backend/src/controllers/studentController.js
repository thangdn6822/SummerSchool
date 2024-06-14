import { StatusCodes } from 'http-status-codes'
import { update } from 'lodash'
import { studentService } from '~/services/studentService'

const createNew = async (req, res, next) => {
    try {
        const createdStudent = await studentService.createNew(req.body)
        console.log('req.body: ', req.body)
        res.status(StatusCodes.CREATED).json(createdStudent)

    }
    catch(error) {
        next(error)
    }
}

// const getDetails = async (req, res, next) => {
//     try {
//         const studentId = req.params.id
//         const student = await studentService.getDetails(studentId)

//         res.status(StatusCodes.OK).json(student)
//     }
//     catch(error) {
//         next(error)
//     }
// }

const getStudents = async (req, res, next) => {
    try {
    // const userId = req.params.id
    const startIndex = parseInt(req.query.startIndex) || 0
    const limit = parseInt(req.query.limit) || 9
    const sortDirection = req.query.sort === 'desc' ? -1 : 1;
    const studentsData = await studentService.getStudents(startIndex, limit, sortDirection)
    res.status(StatusCodes.OK).json(studentsData)
    }
    catch(error) {
        next(error)
    }
}
 

export const studentController = {
    createNew,
    getStudents
   

}
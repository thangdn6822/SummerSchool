import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'
import { studentModel } from '~/models/studentModel'
import { v4 as uuidv4 } from 'uuid';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '~/config/environment';

const generatedString = 'DNT' + uuidv4().replace(/\D/g, '').substring(0, 8)

// const signin = async (studentName, studentPassword) => {
//     try {
//         const validStudent = await studentModel.findOneByUser(studentName)
//         if (!validStudent) {
//             throw new ApiError(StatusCodes.NOT_FOUND, 'Student Not Found!')
//         }

//         const validPassword = bcryptjs.compareSync(studentPassword, validStudent.studentPassword)
//         if (!validPassword) {
//             throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid password')
//         }

//         const token = jwt.sign(
//             {id: validStudent._id},
//             env.JWT_SECRET
//         )

    
//         const { password: pass, ...rest } = validStudent

//         return {token, studentData: rest};
//     }
//     catch(error) {
//         throw new Error(error)
//     }
// }


const createNew = async (reqBody) => {
    try {
        const newStudent = {
            studentId: generatedString,
            ...reqBody
            
        }

        const createdStudent = await studentModel.createNew(newStudent)
        
        const getNewStudent = await studentModel.findOneById(createdStudent.insertedId)
        return getNewStudent
    }
    catch(error) {
        throw new Error(error)
    }
}

const getStudents = async (startIndex, limit, sortDirection) => {
    try {
        const studentsData = await studentModel.getStudents(startIndex, limit, sortDirection)
        return studentsData
    } 
    catch(error) {
        throw new Error(error)
    }
}


export const studentService = {
    createNew,
    getStudents
}

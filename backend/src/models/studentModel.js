import Joi from 'joi';
import { update } from 'lodash';
import { ObjectId } from 'mongodb';
import { GET_DB } from '~/config/mongodb';
import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators';


const STUDENT_COLLECTION_NAME = 'students'
const STUDENT_COLLECTION_SCHEMA = Joi.object({
    studentId: Joi.string().required().min(3).max(256).trim().strict(),
    studentName: Joi.string().required().min(3).max(256).trim().strict(),
    // studentPassword: Joi.string().required().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE).trim(),
    studentPhone: Joi.string().length(10).pattern(/^[0-9]+$/),
    studentWorkplace: Joi.string().required().min(3).max(256).trim().strict(),
    studentObject:Joi.string().required().valid('Học sinh', 'Sinh viên', 'Người đi làm'),
    studentLevel:Joi.string().required().valid('Chưa biết gì', 'Tương đối hiểu biết', 'Hiểu biết', 'Chuyên gia'),
    studentOutput: Joi.string().required().default(''),
    // studentImage: Joi.string().default('https://w1.pngwing.com/pngs/743/500/png-transparent-circle-silhouette-logo-user-user-profile-green-facial-expression-nose-cartoon-thumbnail.png'),

    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})


const validateBeforeCreate = async (data) => {
    return await STUDENT_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}


const createNew = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)
        const createdStudent = await GET_DB().collection(STUDENT_COLLECTION_NAME).insertOne(validData)
        return createdStudent
    }
    catch (error) {
        throw new Error(error)
    }
}


const findOneById = async (studentId) => {
    try {
        const result = await GET_DB().collection(STUDENT_COLLECTION_NAME).findOne({
            studentId: studentId
        })
        return result
    }
    catch(error) {
        throw new Error(error)
    }
}

const getStudents = async (startIndex, limit, sortDirection) => {
    const students = await GET_DB().collection(STUDENT_COLLECTION_NAME).find().sort({ createdAt: sortDirection })
    .skip(startIndex)
    .limit(limit)
    .toArray()


    const totalStudents = await GET_DB().collection(STUDENT_COLLECTION_NAME).countDocuments();
    const now = new Date()
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
    const lastMonthStudents = await GET_DB().collection(STUDENT_COLLECTION_NAME).countDocuments({
        createdAt: { $gte: oneMonthAgo}
    })

    return {students, totalStudents, lastMonthStudents}
}





export const studentModel = {
    STUDENT_COLLECTION_NAME,
    STUDENT_COLLECTION_SCHEMA,
    createNew,
    findOneById, 
    getStudents
}
import Joi from 'joi';
import { update } from 'lodash';
import { ObjectId } from 'mongodb';
import { GET_DB } from '~/config/mongodb';
import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators';


const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
    userId: Joi.string().required().min(3).max(256).trim().strict(),
    username: Joi.string().required().min(3).max(256).trim().strict(),
    password: Joi.string().required().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE).trim(),
    email:Joi.string().required().email(),
    role: Joi.string().valid(
        'god',
        'staff'
    ).required(),
    profilePicture: Joi.string().default('https://w1.pngwing.com/pngs/743/500/png-transparent-circle-silhouette-logo-user-user-profile-green-facial-expression-nose-cartoon-thumbnail.png'),

    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
    return await USER_COLLECTION_SCHEMA.validateAsync(data, {
        abortEarly: false
    })
}

const createNew = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)
        const createdUser = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)
        return createdUser
    }
    catch (error) {
        throw new Error(error)
    }
}

const getUsers = async (startIndex, limit, sortDirection) => {
    const users = await GET_DB().collection(USER_COLLECTION_NAME).find().sort({ createdAt: sortDirection })
    .skip(startIndex)
    .limit(limit)
    .toArray()

    const usersWithoutPassword = users.map(user => {
        const { password, ...rest } = user;
        return rest;
      });

    const totalUsers = await GET_DB().collection(USER_COLLECTION_NAME).countDocuments();
    const now = new Date()
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
    const lastMonthUsers = await GET_DB().collection(USER_COLLECTION_NAME).countDocuments({
        createdAt: { $gte: oneMonthAgo}
    })

    return {users: usersWithoutPassword, totalUsers, lastMonthUsers}
}

const findOneByUser = async (username) => {
    try {
        const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({
            username: username
        })
        return result
    }
    catch(error) {
        throw new Error(error)
    }
}

const updateUser = async (userId, updateData) => {
    try {
      const updatedUser = await GET_DB().collection(USER_COLLECTION_NAME).findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $set: updateData },
        { returnDocument: 'after' }
      );
      return updatedUser.value;
    } catch (error) {
      throw new Error(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await GET_DB().collection(USER_COLLECTION_NAME).deleteOne({ _id: ObjectId(userId) });
    } catch (error) {
      throw new Error(error);
    }
  };


export const userModel = {
    USER_COLLECTION_NAME, 
    USER_COLLECTION_SCHEMA,
    createNew,
    getUsers,
    findOneByUser,
    updateUser,
    deleteUser
}

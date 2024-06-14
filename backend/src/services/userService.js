import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userModel } from '~/models/userModel';
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes';
import { env } from '~/config/environment';

import { v4 as uuidv4 } from 'uuid';

const generatedString = 'ADMIN' + uuidv4().replace(/\D/g, '').substring(0, 8)


const signin = async (username, password) => {
    try {
        const validUser = await userModel.findOneByUser(username)
        if (!validUser) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User Not Found!')
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid password')
        }

        const token = jwt.sign(
            {id: validUser._id},
            env.JWT_SECRET
        )

    
        const { password: pass, ...rest } = validUser

        return { token, userData: rest };
    }
    catch(error) {
        throw new Error(error)
    }
}

const signup = async (userData) => {
    const {username, email, password, role} = userData

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'All fields are required')
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = {
        userId: generatedString,
        username,
        email,
        password: hashedPassword, 
        role
    }

    try {
        await userModel.createNew(newUser)
        return 'SignUp successful'
    }
    catch(error) {
        throw new Error(error)
    }
}

const deleteUser = async (userId) => {
    try {
        const user = await userModel.findOneById(userId)
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Comment Not Found!')
        }
        await userModel.deleteOneById(userId)
    }
    catch(error) {
        throw new Error(error)
    }
}


const updateUser = async (userId, updateData) => {
    const { username, email, password, profilePicture } = updateData;
    
    if (password) {
      if (password.length < 6) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Password must be at least 6 characters');
      }
      updateData.password = bcryptjs.hashSync(password, 10);
    }
  
    if (username) {
      if (username.length < 7 || username.length > 20) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Username must be between 7 and 20 characters');
      }
      if (username.includes(' ')) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Username cannot contain spaces');
      }
      // if (username !== username.toLowerCase()) {
      //   throw new ApiError(StatusCodes.BAD_REQUEST, 'Username must be lowercase');
      // }
      if (!username.match(/^[a-zA-Z0-9]+$/)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Username can only contain letters and numbers');
      }
    }
  
    try {
      const updatedUser = await userModel.updateUser(userId, {
        username,
        email,
        profilePicture,
        password: updateData.password
      });
      const { password, ...rest } = updatedUser;
      return rest;
    } catch (error) {
      throw new Error(error);
    }
  };
  
  const getUsers = async (startIndex, limit, sortDirection) => {
    try {
        const usersData = await userModel.getUsers(startIndex, limit, sortDirection)
        return usersData
    } 
    catch(error) {
        throw new Error(error)
    }
}
  
  const getUserById = async (userId) => {
    try {
      const user = await userModel.findOneById(userId);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User Not Found!');
      }
      const { password, ...rest } = user;
      return rest;
    } catch (error) {
      throw new Error(error);
    }
  };

export const userService = {
    signin,
    signup,
    updateUser,
    getUsers,
    getUserById, 
    deleteUser
}
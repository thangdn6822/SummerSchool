import ApiError from '~/utils/ApiError'
import { userService } from '~/services/userService'
import { StatusCodes } from 'http-status-codes'
const signin = async (req, res, next) => {
    const {username, password} = req.body
    try {
        const {token, userData} = await userService.signin(username, password);
        res
        .status(StatusCodes.OK)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(userData);
    }
    catch(error) {
        next(error)
    }
}

const signup = async (req, res, next) => {
    try {
        const message = await userService.signup(req.body)
        res.status(StatusCodes.CREATED).json(message)
    }
    catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
      const updatedUser = await userService.updateUser(req.params.userId, req.body);
      res.status(StatusCodes.OK).json(updatedUser);
    } catch (error) {
      next(error);
    }
  };
  

const deleteUser = async (req, res, next) => {

    try {
      await userService.deleteUser(req.params.userId);
      res.status(StatusCodes.OK).json({ message: 'User has been deleted' });
    } catch (error) {
      next(error);
    }
  };

  const getUsers = async (req, res, next) => {
    try {
    // const userId = req.params.id
    const startIndex = parseInt(req.query.startIndex) || 0
    const limit = parseInt(req.query.limit) || 9
    const sortDirection = req.query.sort === 'desc' ? -1 : 1;
    const usersData = await userService.getUsers(startIndex, limit, sortDirection)
    res.status(StatusCodes.OK).json(usersData)
    }
    catch(error) {
        next(error)
    }
}
  
const getUser = async (req, res, next) => {
    try {
      const user = await userService.getUserById(req.params.userId);
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  };

export const userController = {
    signin,
    signup,
    updateUser,
    deleteUser,
    getUser,
    getUsers
}
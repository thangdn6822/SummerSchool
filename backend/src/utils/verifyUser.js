import jwt from 'jsonwebtoken'
import ApiError from './ApiError'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(ApiError(401, 'Unathorized'))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return next(ApiError(401, 'Unauthorized'));
        }
        req.user = user;
        next();
      });
}
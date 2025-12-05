import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorHandler.js";


const protect = asyncHandler((req, res, next) => {
   const token = req.cookies['token'];
   if (!token) return next(new ApiError('Not authorized, no token provided', 401))

   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   if (!decoded?.id) {
      return next(new ApiError('Invalid token payload', 401))
   }
   req.userId = decoded.id;
   next();
})


const socketAuth = async (err, socket, next) => {
   try {
      if (err) return next(err);
      const authToken = socket.request.cookies.token;
      if (!authToken) {
         return next(new ApiError("Not authorized, no token provided", 401));
      }
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return next(new ApiError("Please login to access this route", 401));
      socket.user = user;
      
      return next();
   } catch (error) {
      return next(new ApiError(error, 400));
   }
}

export {  protect, socketAuth };

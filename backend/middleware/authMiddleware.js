import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protect route
export const protect = asyncHandler(async (req, res, next) => {
    let token;
    
    // Read the JWT from the cookie
    token = req.cookies.jwt;

    if (token) {
        // console.log("token from protect middleware \n", token)
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // saving the logged in user in the req object(excluding the password field).
            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, login first!')
    }
});

// Admin middleware
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin');
    }
};
import errorHandler from "../handler/error.handler.js";
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config()

const authKey = process.env.AUTH_KEY


const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];

    if (!token || token == null || token.trim() == "") {
      errorHandler(403, 'Invalid token. Authentication failed.', res)
      return
    }

    console.log("Jwt to verify: ", token)

    jwt.verify(token, authKey, (err, decoded) => {
      if (err) {
        errorHandler(401, 'Unauthorised.', res)
        return
      }
      req.username = decoded.id;
      req.admin = decoded.admin
      next();
    });
  } catch (error) {
    console.log(error, 'error')
    errorHandler(500, 'Server error occurred', res)
  }
};

const authJwt = {
  verifyToken,
};

export default authJwt;

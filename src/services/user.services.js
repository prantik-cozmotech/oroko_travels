import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import successHandler from "../handler/success.handler.js";
import errorHandler from "../handler/error.handler.js";

import { User } from "../models/index.js";


const authKey = "PublicPasswordForTesting"



const verifyUser = async (payload, res) => {
  try {

    const user = await User.findOne({ where: { email: payload.email } });

    if (!user) {
      return errorHandler(401, 'Invalid Credentials', res)
    }

    const userDetails = user;

    // verify password
    const passwordIsValid = bcrypt.compareSync(
      payload.password,
      userDetails.password
    );

    if (!passwordIsValid) {
      errorHandler(401, 'Invalid Credentials', res)
      return
    }

    // create session
    const token = jwt.sign({
      id: userDetails.user_name,
      role: userDetails.role
    }, authKey, {
      expiresIn: 3600 // 1 hour
    });


    console.log("User details => ", userDetails)

    let data = {
      userId: `${userDetails.id}`,
      username: userDetails.username,
      email: userDetails.email,
      accessToken: token,
    };

    successHandler(200, 'Successfully logged in.', res, data)

  } catch (error) {
    console.log(error, 'error')
    errorHandler(500, 'Server error occurred', res)
  }
}


const homepage = async (res) => {

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Welcome Page</title>
      </head>
      <body>
        <h1>Hello, welcome to our site!</h1>
      </body>
    </html>
  `);
}


const userService = {
  verifyUser,
  homepage
}

export default userService;

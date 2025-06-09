import successHandler from "../handler/success.handler.js";
import errorHandler from "../handler/error.handler.js";
import bcrypt from 'bcrypt';


import { User } from "../models/index.js";


const registerUser = async (payload, res) => {

  try {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    console.log("Hashed password : ", hashedPassword)

    const newUser = await User.create({
      username: payload.username,
      email: payload.email,
      password: hashedPassword
    })

    if (!newUser) {
      errorHandler.errorHandler(500, 'Error in adding new user plan.', res)
      return
    }

    successHandler(200, 'User registered', res, newUser.user_name)

  } catch (error) {
    console.log(error, 'error')

    if (error.parent.code == 23505) {
      errorHandler(400, 'Username or email already exist', res)
    } else {
      errorHandler(500, 'Server error occurred', res)
    }
  }
};


const registrationService = {
  registerUser,
}

export default registrationService;

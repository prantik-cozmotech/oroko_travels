import errorHandler from "../handler/error.handler.js";
import formValidations from "../validations/form.validations.js";

import userService from "../services/user.services.js";
import successHandler from "../handler/success.handler.js";


const signin = async (req, res) => {
  try {

    const loginDetails = {
      email: req.body.email,
      password: req.body.password,
    };

    const validated = await formValidations.loginValidations(loginDetails, res)

    console.log("Validated : ", validated)

    if (validated == true) {
      userService.verifyUser(loginDetails, res)
    }
  } catch (error) {
    console.log(error, 'error in signin')
  }
};


const signout = async (req, res) => {
  try {
    return successHandler(200, 'Logged out successfully.', res);
  } catch (error) {
    errorHandler(400, error, res)
  }
};


const homepage = async (req, res) => {
  try {
    userService.homepage(res)
  } catch (error) {
    errorHandler(400, error, res)
  }
}


const authController = {
  signin,
  signout,
  homepage,
}

export default authController;

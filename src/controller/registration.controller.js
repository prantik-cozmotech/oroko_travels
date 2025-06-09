import registrationService from "../services/registration.service.js";
import formValidations from "../validations/form.validations.js";
import errorHandler from "../handler/error.handler.js";


const register = async (req, res) => {
  try {

    console.log("Req body => ", req.body.body)

    const registrationPayload = {
      username: req.body.username || "",
      email: req.body.email || "",
      // phoneNumber: req.body.phoneNumber || "",
      // role: req.body.role || "",
      password: req.body.password || "",
    };

    console.log("registrationPayload : ", registrationPayload)

    const validated = await formValidations.registrationValidation(registrationPayload, res)

    if (validated == true) {
      registrationService.registerUser(registrationPayload, res);
    }
  } catch (error) {
    console.log(error, 'error in register')
    return errorHandler(403, error, res)
  }
};


const registrationController = {
  register,
}


export default registrationController;

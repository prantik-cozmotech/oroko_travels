import validators from "../library/validations.js";
import errorHandler from "../handler/error.handler.js";


const userValidations = async (payloadData, res) => {
  console.log(payloadData.email)
  try {
    validators.validStringData('First Name', payloadData.firstName)
    validators.validStringData('Last Name', payloadData.lastName)
    validators.validEmail('Email', payloadData.email)
    validators.validUserName('Username', payloadData.username)

    return true
  } catch (error) {
    console.log("Error userValidation: ", error)
    return false
  }
};



const registrationValidation = async (payloadData, res) => {
  console.log("Registration payload: ", payloadData)

  try {
    validators.validStringData("User Name", payloadData.username)
    validators.validEmail("User Email", payloadData.email)
    // validators.validStringData('Last Name', payloadData.lastName)
    // validators.validPhoneNumber('Phone number', payloadData.phoneNumber)
    // validators.validUserRole('Role', payloadData.role)
    validators.validPassword("Password", payloadData.password)

    return true
  } catch (error) {
    console.log("Error registrationValidation: ", error)
    errorHandler(403, error, res)
  }
};


const loginValidations = async (payloadData, res) => {
  try {
    validators.validEmail("User Email", payloadData.email)
    validators.validPassword("Password", payloadData.password)

    return true
  } catch (error) {
    console.log("Error login validaiton : ", error)
    errorHandler(403, error, res)
  }
}


const formValidations = {
  userValidations,
  registrationValidation,
  loginValidations
}


export default formValidations;

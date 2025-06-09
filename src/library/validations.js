const validNumber = (name, data) => {
  if (isNaN(data)) {
    throw `${name} is not a valid Username`;
  }
};

const validStringData = (name, data) => {
  if (!data || data == null || data == "") {
    throw `${name} is required. Please enter a valid ${name} (Min 3 character long)`;
  }
};


const validPassword = (name, password) => {
  validStringData(name, password)
  const strongPwdRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!strongPwdRegex.test(password)) {
    throw `${name} is invalid. Your password must be atleast 8 characters long, with one upper case,lower case character, one number and a special character.`;
  }
};


const validPhoneNumber = (name, number) => {
  validNumber(name, number)
  const numTenRegex = /^\d{10}$/;
  let valid = numTenRegex.test(number)
  if (!valid) {
    throw `${name} is invalid. Please enter a valid ${name}`;
  }
};


const validEmail = (name, email) => {
  validStringData(name, email)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw `${name} is invalid. Please enter a valid ${email}`;
  }
}


const validators = {
  validStringData,
  validPassword,
  validNumber,
  validPhoneNumber,
  validEmail,
}

export default validators;

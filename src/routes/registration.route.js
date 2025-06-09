import registrationController from "../controller/registration.controller.js";


const registrationRoute = (app) => {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.post("/api/v1/register_user", registrationController.register);
};


export default registrationRoute;

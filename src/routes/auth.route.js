import authJwt from '../middleware/authJwt.js'
import authController from '../controller/auth.controller.js';


const authRoutes = (app) => {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.post("/api/v1/signin", authController.signin);
  app.get("/api/v1/signout", [authJwt.verifyToken, authController.signout]);
  app.get("/api/v1/home", [authJwt.verifyToken, authController.homepage])
};


export default authRoutes;

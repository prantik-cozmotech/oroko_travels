import express from "express"


const app = express()
import bodyParser from "body-parser";
import cors from "cors";


import authRoutes from "./src/routes/auth.route.js";
import registrationRoute from "./src/routes/registration.route.js";
import getConnection from "./src/config/dbconnection.js"

import dotenv from 'dotenv';
dotenv.config()

const PORT = parseInt(process.env.SERVER_PORT, 10) || 8000;

const corsOptions = {
  origin: ["http://192.168.1.144:5175"],
  credentails: true
};

process.env.TZ = "Asia/Kolkata";
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

registrationRoute(app)
authRoutes(app)


app.listen(PORT, '0.0.0.0', () => {
  getConnection()
  console.log(`App listening on port ${PORT}`)
})


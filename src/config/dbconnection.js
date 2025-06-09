import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config()

const DB_HOST = process.env.DB_HOST
const DB_PORT = parseInt(process.env.DB_PORT, 10) || 5432
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD


const getConnection = async () => {

  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })

  try {
    await sequelize.authenticate();
    console.log("Connection to the DB has been established!")
  } catch (error) {
    console.error("Unable to connect to the DB: ", error)
  }

  return sequelize
}


export default getConnection;

import getConnection from "../config/dbconnection.js";
import UserModel from "./UserModel.js";


const sequelize = await getConnection();

const User = UserModel(sequelize);

await sequelize.sync({ alter: true });

export { User };

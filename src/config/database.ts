import { Sequelize } from "sequelize"; //conexão com o bd

const sequelize = new Sequelize("shop_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;

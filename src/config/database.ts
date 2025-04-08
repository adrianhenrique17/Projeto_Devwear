import { Sequelize } from "sequelize"; //conexão com o bd

// config do database

const sequelize = new Sequelize("shop_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;

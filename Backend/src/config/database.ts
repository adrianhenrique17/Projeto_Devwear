import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    "landingpage", "root" ,"",{ host: "localhost", dialect: "mysql"
    }
)

export default sequelize
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class RegistroModel extends Model {
    id: number | undefined;
    email: string | undefined;
    senha: string | undefined;
    cpf: number | undefined;
}

RegistroModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
},

{
    sequelize,
    modelName: 'RegistroModel',
    tableName: 'registro'
})

export default RegistroModel
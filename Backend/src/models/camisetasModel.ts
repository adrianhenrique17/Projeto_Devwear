import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class CamisetasModel extends Model {
    id: number | undefined;
    camisetas: string | undefined;

    
}

CamisetasModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    camisetas: {
        type: DataTypes.STRING,
        allowNull: false
    }

},

{
    sequelize,
    modelName: 'CamisetasModel',
    tableName: 'camisetas'
})

export default CamisetasModel
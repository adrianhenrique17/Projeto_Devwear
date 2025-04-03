// src/models/camisa.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface CamisaAttributes {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem_url: string;
}

interface CamisaCreationAttributes extends Optional<CamisaAttributes, "id"> {}

class Camisa
  extends Model<CamisaAttributes, CamisaCreationAttributes>
  implements CamisaAttributes
{
  public id!: number;
  public nome!: string;
  public descricao!: string;
  public preco!: number;
  public imagem_url!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Camisa.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    imagem_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "camisas",
    timestamps: true,
  }
);

export default Camisa;

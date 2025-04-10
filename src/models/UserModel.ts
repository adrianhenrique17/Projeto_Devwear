import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcrypt";

// Regex para validação de e-mail
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const SENHA_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
/*
  /^
  (?=.*\d)              // deve conter ao menos um dígito
  (?=.*[a-z])           // deve conter ao menos uma letra minúscula
  (?=.*[A-Z])           // deve conter ao menos uma letra maiúscula
  (?=.*[$*&@#])         // deve conter ao menos um caractere especial
  [0-9a-zA-Z$*&@#]{8,}  // deve conter ao menos 8 dos caracteres mencionados
*/

class UserModel extends Model {
  id!: number;
  email!: string;
  name!: string;
  password!: string;
  cpf!: number;
  updatedBy?: number;
  isActive!: boolean;

  public async hashPassword() {
    this.password = await bcrypt.hash(this.password!, 10);
  }

  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password!);
  }
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "O e-mail é obrigatório",
        },
        isEmail: {
          msg: "Por favor, insira um e-mail válido",
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O nome é obrigatório",
        },
        len: {
          args: [3, 100],
          msg: "O nome deve ter entre 3 e 100 caracteres",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "A senha é obrigatória",
        },
        len: {
          args: [6, 100],
          msg: "A senha deve ter no mínimo 6 caracteres",
        },
      },
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isCPF(value: string) {
          if (value && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value)) {
            throw new Error("Formato de CPF inválido (use XXX.XXX.XXX-XX)");
          }
        },
      },
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notEmpty: {
          msg: "O status do usuário é obrigatório",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "UserModel",
    tableName: "users",
    hooks: {
      beforeCreate: async (user: UserModel) => {
        await user.hashPassword();
      },
      beforeUpdate: async (user: UserModel) => {
        if (user.changed("password")) {
          await user.hashPassword();
        }
      },
    },
  }
);

export default UserModel;

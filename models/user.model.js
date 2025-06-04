import sequelize from '../config/db.js'
import { DataTypes } from 'sequelize'
const userModel = sequelize.define(
  "user", {
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
   admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
}
)

export default userModel;

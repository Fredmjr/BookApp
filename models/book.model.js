import sequelize from '../config/db.js'
import { DataTypes } from 'sequelize'
const bookModel = sequelize.define(
  "book", {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  file: {
    type: DataTypes.TEXT,
    allowNull: false,
  }

}
)

export default bookModel;

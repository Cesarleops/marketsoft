import { DataTypes } from "sequelize";
import { dbClient } from "../database/client.js";
import user from "./user.js";

const sale = dbClient.define("Sale", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    field: "user_id",
    type: DataTypes.UUID,
    references: {
      model: user,
      key: "id",
    },
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'sales'
});

export default sale;

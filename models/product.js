import { DataTypes } from "sequelize";
import { dbClient } from "../database/client.js";
import provider from "./provider.js";

const product = dbClient.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(510),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    providerId: {
      type: DataTypes.UUID,
      field: "provider_id",
      references: {
        model: provider,
        key: "id",
      },
    },
  },
  {
    tableName: "products",
  },
);

export default product;

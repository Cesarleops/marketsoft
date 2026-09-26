import { DataTypes } from "sequelize";
import { dbClient } from "../database/client.js";
import product from "./product.js";
import sale from "./sale.js";

const saleDetail = dbClient.define("SaleDetail", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  saleId: {
    type: DataTypes.UUID,
    field: "sale_id",
    references: {
      model: sale,
      key: "id",
    },
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    field: "product_id",
    references: {
      model: product,
      key: "id",
    },
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'sale_details'
});

export default saleDetail;

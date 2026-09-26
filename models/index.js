import Provider from "./provider.js";
import User from "./user.js";
import Product from "./product.js";
import Sale from "./sale.js";
import SaleDetail from "./sale-detail.js";

Product.belongsTo(Provider, { foreignKey: "providerId" });
Provider.hasMany(Product, { foreignKey: "providerId" });

Sale.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Sale, { foreignKey: "userId" });

Sale.hasMany(SaleDetail, { foreignKey: "saleId" });
SaleDetail.belongsTo(Sale, { foreignKey: "saleId" });

SaleDetail.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(SaleDetail, { foreignKey: "productId" });

export { Product, Provider, Sale, SaleDetail, User };

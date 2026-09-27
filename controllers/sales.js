import { dbClient } from "../database/client.js";
import { Product, Sale, SaleDetail, User } from "../models/index.js";

export const getSales = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: [
        { model: User },
        { model: SaleDetail, include: { model: Product } },
      ],
    });

    res.json(sales);
  } catch (e) {
    res.status(500).json({ message: "Failed to find sales" });
  }
};

export const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findByPk(id, {
      include: [
        { model: User },
        { model: SaleDetail, include: { model: Product } },
      ],
    });

    if (!sale) {
      res.status(404).json({ message: "Sale not found" });
      return;
    }

    res.json(sale);
  } catch (e) {
    res.status(500).json({ message: "Failed to find sale" });
  }
};

export const createSale = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ message: "userId and items array are required" });
      return;
    }

    const user = await User.findByPk(userId);
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    for (const item of items) {
      if (!item.productId || item.quantity == null || item.quantity <= 0) {
        res
          .status(400)
          .json({ message: "Each item requires productId and quantity > 0" });
        return;
      }
    }

    const productIds = items.map((item) => item.productId);

    const products = await Product.findAll({
      where: { id: productIds },
    });

    const productsById = new Map(products.map((p) => [p.id, p]));

    for (const item of items) {
      if (!productsById.has(item.productId)) {
        res
          .status(400)
          .json({ message: `Product ${item.productId} does not exist` });
        return;
      }
    }

    for (const item of items) {
      const product = productsById.get(item.productId);
      if (product.stock < item.quantity) {
        res.status(400).json({
          message: `Insufficient stock for product ${product.name}`,
        });
        return;
      }
    }

    let saleTotal = 0;

    for (const item of items) {
      saleTotal +=
        Number(productsById.get(item.productId).price) * item.quantity;
    }

    // a transaction guarantees the atomicity
    // of the operation
    const sale = await dbClient.transaction(async (transaction) => {
      const newSale = await Sale.create(
        { userId, date: new Date(), total: saleTotal },
        { transaction },
      );

      for (const item of items) {
        const product = productsById.get(item.productId);

        await SaleDetail.create(
          {
            saleId: newSale.id,
            productId: item.productId,
            quantity: item.quantity,
            price: product.price,
          },
          { transaction },
        );

        await product.decrement("stock", {
          by: item.quantity,
          transaction,
        });
      }

      return newSale;
    });

    const saleWithDetails = await Sale.findByPk(sale.id, {
      include: [
        { model: User },
        { model: SaleDetail, include: { model: Product } },
      ],
    });

    res.status(201).json(saleWithDetails);
  } catch (e) {
    if (e.name === "SequelizeForeignKeyConstraintError") {
      res.status(400).json({ message: "User or product does not exist" });
      return;
    }
    res.status(500).json({ message: "Failed to create sale" });
  }
};

export const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const sale = await Sale.findByPk(id);

    if (!sale) {
      res.status(404).json({ message: "Sale not found" });
      return;
    }

    if (userId != null) {
      const user = await User.findByPk(userId);

      if (!user) {
        res.status(400).json({ message: "User does not exist" });
        return;
      }

      await sale.update({ userId });
    }

    const saleWithDetails = await Sale.findByPk(sale.id, {
      include: [
        { model: User },
        { model: SaleDetail, include: { model: Product } },
      ],
    });

    res.json(saleWithDetails);
  } catch (e) {
    if (e.name === "SequelizeForeignKeyConstraintError") {
      res.status(400).json({ message: "User does not exist" });
      return;
    }
    res.status(500).json({ message: "Failed to update sale" });
  }
};

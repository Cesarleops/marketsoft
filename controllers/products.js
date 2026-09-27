import { Product } from "../models/index.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.json(products);
  } catch (e) {
    res.status(500).json({ message: "Failed to find products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json(product);
  } catch (e) {
    res.status(500).json({ message: "Failed to find product" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, providerId } = req.body;

    if (!name || !description || price == null || stock == null) {
      res
        .status(400)
        .json({ message: "name, description, price and stock are required" });
      return;
    }

    if (price <= 0) {
      res.status(400).json({ message: "Price must be greater than 0" });
      return;
    }

    if (stock < 0) {
      res.status(400).json({ message: "Stock cannot be less than 0" });
      return;
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      providerId,
    });

    res.status(201).json(product);
  } catch (e) {
    if (e.name === "SequelizeForeignKeyConstraintError") {
      res.status(400).json({ message: "Provider does not exist" });
      return;
    }
    res.status(500).json({ message: "Failed to create product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, providerId } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (price != null && price <= 0) {
      res.status(400).json({ message: "Price must be greater than 0" });
      return;
    }

    if (stock != null && stock < 0) {
      res.status(400).json({ message: "Stock cannot become less than 0" });
      return;
    }

    await product.update({
      name,
      description,
      price,
      stock,
      providerId,
    });

    res.json(product);
  } catch (e) {
    if (e.name === "SequelizeForeignKeyConstraintError") {
      res.status(400).json({ message: "Provider does not exist" });
      return;
    }
    console.log("Failed to update product");
    res.status(500).json({ message: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    await product.destroy();

    res.status(204).send();
  } catch (e) {
    if (e.name === "SequelizeForeignKeyConstraintError") {
      res.status(409).json({
        message: "Product is referenced by sales and cannot be deleted",
      });
      return;
    }
    res.status(500).json({ message: "Failed to delete product" });
  }
};

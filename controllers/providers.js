import { Provider } from "../models/index.js";

export const getProviders = async (req, res) => {
  try {
    const providers = await Provider.findAll();

    res.json(providers);
  } catch (e) {
    res.status(500).json({ message: "Failed to find providers" });
  }
};

export const getProviderById = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await Provider.findByPk(id);

    if (!provider) {
      res.status(404).json({ message: "Provider not found" });
      return;
    }

    res.json(provider);
  } catch (e) {
    res.status(500).json({ message: "Failed to find provider" });
  }
};

export const createProvider = async (req, res) => {
  try {
    const { name, phone, email, city } = req.body;

    if (!name || !phone || !email || !city) {
      res
        .status(400)
        .json({ message: "name, phone, email and city are required" });
      return;
    }

    const provider = await Provider.create({ name, phone, email, city });

    res.status(201).json(provider);
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      res.status(409).json({ message: "Email already in use" });
      return;
    }

    res.status(500).json({ message: "Failed to create provider" });
  }
};

export const updateProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, city } = req.body;

    const provider = await Provider.findByPk(id);

    if (!provider) {
      res.status(404).json({ message: "Provider not found" });
      return;
    }

    await provider.update({
      name,
      phone,
      email,
      city,
    });

    res.json(provider);
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      res.status(409).json({ message: "Email already in use" });
      return;
    }
    res.status(500).json({ message: "Failed to update provider" });
  }
};

export const deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const provider = await Provider.findByPk(id);

    if (!provider) {
      res.status(404).json({ message: "Provider not found" });
      return;
    }

    await provider.destroy();

    res.status(204).send();
  } catch (e) {
    if (e.name === "SequelizeForeignKeyConstraintError") {
      res
        .status(409)
        .json({ message: "Provider has products and cannot be deleted" });
      return;
    }
    res.status(500).json({ message: "Failed to delete provider" });
  }
};

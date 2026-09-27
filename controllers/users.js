import { User } from "../models/index.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (e) {
    console.log("Failed to find users");
    res.status(404).json({
      message: "Failed to find users",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (e) {
    console.log("Failed to find user");
    res.status(500).json({ message: "Failed to find user" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
      res.status(400).json({ message: "name, email and role are required" });
      return;
    }

    const user = await User.create({ name, email, role });

    res.status(201).json(user);
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      res.status(409).json({ message: "Email already in use" });
      return;
    }
    console.log("Failed to create user", e.message);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await user.update({
      name,
      email,
      role,
    });

    res.json(user);
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      res.status(409).json({ message: "Email already in use" });
      return;
    }
    console.log("Failed to update user");
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await user.destroy();

    res.status(204).send();
  } catch (e) {
    if (e.name === "SequelizeForeignKeyConstraintError") {
      res
        .status(409)
        .json({ message: "User has sales and cannot be deleted" });
      return;
    }
    console.log("Failed to delete user");
    res.status(500).json({ message: "Failed to delete user" });
  }
};

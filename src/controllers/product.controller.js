import { ProductModel } from "../models/product.model.js";

export const ProductController = {
  // Create product
  createProduct: async (req, res) => {
    try {
      const product = await ProductModel.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await ProductModel.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get product by ID
  getProductById: async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update product
  updateProduct: async (req, res) => {
    try {
      const updated = await ProductModel.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete product
  deleteProduct: async (req, res) => {
    try {
      await ProductModel.delete(req.params.id);
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

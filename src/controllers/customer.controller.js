import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomerModel } from "../models/customer.model.js";

export const CustomerController = {

  // Customer Registration
  registerCustomer: async (req, res) => {
    try {
      const { name, email, password, phone,address } = req.body;

      const exists = await CustomerModel.findByEmail(email);
      if (exists) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const customer = await CustomerModel.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address
      });

      res.status(201).json(customer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Customer Login
  loginCustomer: async (req, res) => {
    try {
      const { email, password } = req.body;

      const customer = await CustomerModel.findByEmail(email);
      if (!customer) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const match = await bcrypt.compare(password, customer.password);
      if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: customer.customer_id, role: "CUSTOMER" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create Customer (Admin)
  createCustomer: async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;

      const exists = await CustomerModel.findByEmail(email);
      if (exists) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const customer = await CustomerModel.create({
        name,
        email,
        password: hashedPassword,
        phone
      });

      res.status(201).json(customer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Admin / Manager
  getAllCustomers: async (req, res) => {
    try {
      const customers = await CustomerModel.findAll();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get Customer by ID
  getCustomerById: async (req, res) => {
    try {
      const customerId = Number(req.params.id);

      // Ownership check
      if (req.user.role === "CUSTOMER" && req.user.id !== customerId) {
        return res.status(403).json({ message: "Access denied" });
      }

      const customer = await CustomerModel.findById(customerId);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      res.json(customer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update Customer
  updateCustomer: async (req, res) => {
    try {
      const customerId = Number(req.params.id);

      if (req.user.role === "CUSTOMER" && req.user.id !== customerId) {
        return res.status(403).json({ message: "Access denied" });
      }

      const updated = await CustomerModel.update(customerId, req.body);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete Customer (Admin)
  deleteCustomer: async (req, res) => {
    try {
      await CustomerModel.delete(req.params.id);
      res.json({ message: "Customer deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

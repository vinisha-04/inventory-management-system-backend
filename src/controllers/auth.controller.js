import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model.js';
import { env } from '../config/env.js';

export const AuthController = {
    register: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) {
                return res.status(409).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await UserModel.create({ name, email, password: hashedPassword, role: role || 'STAFF' });

            res.status(201).json({ user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
            const user = await UserModel.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, env.jwtSecret, { expiresIn: '1h' });
            res.json({ token, user: { user_id: user.user_id, name: user.name, email: user.email, role: user.role, created_at: user.created_at } });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    profile: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await UserModel.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ user });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}
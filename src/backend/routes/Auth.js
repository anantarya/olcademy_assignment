const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Adjust according to your security needs
const dotenv = require('dotenv');

dotenv.config();




router.post('/signup', async (req, res) => {
    try {
        const { email, password, name, avatar } = req.body;
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        if (password == null || password === undefined) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ email, password: hashedPassword, name, avatar });
        const createdUser = await user.save();

        res.status(201).json({
            message: 'User created successfully!',
            token: await createdUser.generateToken(),
            userId: createdUser._id.toString()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (user) {
            res.status(200).json({ message: 'Login successful!', token: await user.generateToken(), userId: user._id.toString() });

        } else {
            res.status(401).json({ message: "invalied email or password " });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add this route in auth.js
// router.put('/profile', async (req, res) => {
//     try {
//         const { email, password, name, avatar } = req.body;
//         // Assuming you have a middleware for authentication to get the user ID
//         const userId = req.user.id;

//         // Find the user by ID and update the details
//         const updatedUser = await User.findByIdAndUpdate(userId, {
//             email,
//             password,
//             name,
//             avatar,
//         }, { new: true });

//         if (!updatedUser) {
//             // Handle case where user with given ID is not found
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.status(200).json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

router.put('/profile', async (req, res) => {
    try {
        // Check if req.user is defined and has the 'id' property
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const { email, password, name, avatar } = req.body;
        const userId = req.user.id;

        // Find the user by ID and update the details
        const updatedUser = await User.findByIdAndUpdate(userId, {
            email,
            password,
            name,
            avatar,
        }, { new: true });

        if (!updatedUser) {
            // Handle case where user with given ID is not found
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
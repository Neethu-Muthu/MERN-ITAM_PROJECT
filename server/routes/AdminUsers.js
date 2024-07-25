const express = require('express');
const router = express.Router();
const AdminUser = require('../models/AdminUser');
const verifyToken = require('../middleware/authMiddleware');

router.get('/users', verifyToken, async (req, res) => {
    try {
        const users = await AdminUser.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// router.post('/users', async (req, res) => {
//     try {
//         const newUser = new AdminUser(req.body);
//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });


router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await AdminUser.findOneAndUpdate(
            { userId: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.send('User updated successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.delete('/users/:id', verifyToken, async (req, res) => {
    try {
        const deletedUser = await AdminUser.findOneAndDelete({ userId: req.params.id });
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;

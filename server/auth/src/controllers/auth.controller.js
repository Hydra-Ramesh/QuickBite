import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
    try {
        const { email, name, picture } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT_SECRET is not configured' });
        }

        let user = await User.findOne({ email });

        if (!user) {
            if (!name || !picture) {
                return res.status(400).json({ message: 'Name and picture are required' });
            }

            user = new User({
                email,
                name,
                image: picture,
            });
            await user.save();
        } else {
            let isUpdated = false;

            if (name && user.username !== name) {
                user.username = name;
                isUpdated = true;
            }

            if (picture && user.image !== picture) {
                user.image = picture;
                isUpdated = true;
            }

            if (isUpdated) {
                await user.save();
            }
        }

        const token = jwt.sign(
            { sub: user._id.toString(), role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error logging in',
            error: error.message,
        });
    }
};
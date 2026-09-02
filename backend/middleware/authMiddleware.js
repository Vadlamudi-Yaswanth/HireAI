const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    // 1. Check if the token exists in the incoming request's Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token string from header format: "Bearer eyJhbGciOi..."
            token = req.headers.authorization.split(' ')[1];

            // 2. Decrypt and verify the token signature using your private JWT_SECRET key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            // 4. Everything is valid! Call next() to proceed to the controller action
            return next();

        } catch (error) {
            console.error('JWT verification failed error:', error.message);
            return res.status(401).json({ message: 'Not authorized, security token verification failed' });
        }
    }
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no security token provided' });
    }
};

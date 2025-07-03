const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.token;
        
        if (!token) {
            return res.status(400).json({ success: false, message: "Token missing." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded",decoded)
        req.id = decoded.id;
        next();

    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized." });
    }
};

module.exports = verifyToken;

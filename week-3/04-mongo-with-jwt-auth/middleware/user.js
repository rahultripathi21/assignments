const JWT_SECRET_KEY = require('../config');
const { UserModel} = require("../db/index");
const jwt = require("jsonwebtoken");


async function userMiddleware(req, res, next) {
    try {
    const token = req.headers.authorization;
    if(!token) return res.json({error: "JWT is missing"});
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const {userName} = decoded;
    const user = await UserModel.findOne({userName});
    if(!user) return res.status(404).json({error: "Forbidden: user not present"});
    next();
} catch (error) {
    // Generated using chat GPT to check other possilbe scenarios
    if (error instanceof jwt.JsonWebTokenError) {
        // Handle malformed or invalid token
        return res.status(401).json({ error: "Invalid token" });
    } else if (error instanceof jwt.TokenExpiredError) {
        // Handle expired token
        return res.status(401).json({ error: "Token expired" });
    } else {
        // Handle other errors
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
}

module.exports = userMiddleware;
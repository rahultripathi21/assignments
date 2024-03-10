const {AdminModel, CourseModel, UserModel} = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    const {username: userName, password} = req.headers;
    const admin = await AdminModel.findOne({userName, password});
    if(!admin) return res.status(404).json({error: "Forbidden: admin not present"});
    next();
}

module.exports = adminMiddleware;
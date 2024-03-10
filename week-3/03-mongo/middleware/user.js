const { UserModel} = require("../db/index");

async function userMiddleware(req, res, next) {
    const {username: userName, password} = req.headers;
    const user = await UserModel.findOne({userName, password});
    if(!user) return res.status(404).json({error: "Forbidden: user not present"});
    next();
}

module.exports = userMiddleware;
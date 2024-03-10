const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const {AdminModel, CourseModel}= require("../db/index.js");
const JWT_SECRET_KEY = require('../config.js');

const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const {userName, password} = req.body;
    await AdminModel.create({userName,password});
    return res.json({
        message: 'Admin created successfully' 
    })
});

router.post('/signin', async (req, res) => {
    const {userName, password} = req.body;
    const admin = await AdminModel.findOne({userName, password});
    if(!admin) return res.status(404).json({error: "Not found"});
    const token = jwt.sign({userName}, JWT_SECRET_KEY);
    return res.status(200).json({token});
});


router.post('/courses', adminMiddleware,async (req, res) => {
    const {title,
        description,
        price,
        imageLink,
        published} = req.body;
    const course =await CourseModel.create({title,
        description,
        price,
        imageLink,
        published});
    return res.json({ message: 'Course created successfully', courseId:course._id })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const courses =await CourseModel.find();
    return res.json({courses});
});

module.exports = router;
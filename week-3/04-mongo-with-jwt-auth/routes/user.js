const { Router } = require("express");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/user");
const {UserModel, CourseModel}= require("../db/index.js");
const JWT_SECRET_KEY = require('../config.js');


const router = Router();

// User Routes
router.post('/signup', async (req, res) => {
    const {userName, password} = req.body;
    await UserModel.create({userName, password});
    return res.status(200).json({message: "User created successfully"});
});

router.post('/signin',async (req, res) => {
    const {userName, password} = req.body;
    const user = await UserModel.findOne({userName, password});
    if(!user) return res.status(404).json({error: "Not found"});
    const token = jwt.sign({userName, password}, JWT_SECRET_KEY);
    return res.status(200).json({token});
});

router.get('/courses', async (req, res) => {
    const courses = await CourseModel.find();
    return res.status(200).json({courses});
});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const token = req.headers.authorization;
        const {userName} = jwt.decode(token, JWT_SECRET_KEY);
        const course = await CourseModel.findById(courseId);
        if(!course) return res.status(404).json({error: "Not Found"});
        await UserModel.findOneAndUpdate({ userName }, { $push: { courses: courseId } });
    
        return res.status(200).json({message:"'Course purchased successfully'"});
    } catch (error) {
        return res.status(500).json({error: "Internal server error"})
    }
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    const token = req.headers.authorization;
    const {userName} = jwt.decode(token, JWT_SECRET_KEY);
    const userData = await UserModel.findOne({userName});
    const purchasedCourses =await CourseModel.find({_id: {$in : userData.courses}});

    return res.status(200).json({purchasedCourses});
});
module.exports = router
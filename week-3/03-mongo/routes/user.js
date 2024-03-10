const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {UserModel, CourseModel} = require("../db/index");

// User Routes
router.post('/signup', async (req, res) => {
    const {userName, password} = req.body;
    await UserModel.create({userName, password});
    return res.status(200).json({message: "User created successfully"});
});

router.get('/courses', async (req, res) => {
    const courses = await CourseModel.find();
    return res.status(200).json({courses});
});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    const courseId = req.params.courseId;
    const userName = req.headers.username;
    const course = await CourseModel.findById(courseId);
    if(!course) return res.status(404).json({error: "Not Found"});
    await UserModel.findOneAndUpdate({ userName }, { $push: { courses: courseId } });

    return res.status(200).json({message:"'Course purchased successfully'"});
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
        const userName = req.headers.username;
        const userData = await UserModel.findOne({userName});
        const purchasedCourses =await CourseModel.find({_id: {$in : userData.courses}});
    
        return res.status(200).json({purchasedCourses});
});

module.exports = router
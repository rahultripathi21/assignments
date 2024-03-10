const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {AdminModel, CourseModel} = require("../db/index");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const {userName, password} = req.body;
    await AdminModel.create({userName,password});
    return res.json({
        message: 'Admin created successfully' 
    })
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
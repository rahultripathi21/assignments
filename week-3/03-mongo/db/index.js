const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin-key:RRLZ7KobHoKfKw01@cluster0.plzw2gv.mongodb.net/udemy-clone');

// Define schemas
const AdminSchema = new mongoose.Schema({
    userName: String,
    password: String,
},{versionKey:false}
);

const UserSchema = new mongoose.Schema({
    userName: String,
    password: String,
    courses: { type: [String], required: false },
},{versionKey:false});

const CourseSchema = new mongoose.Schema({
    title: String, 
    description: String, 
    price: Number, 
    imageLink: String, 
    published: Boolean,
},{versionKey:false});

const AdminModel = mongoose.model('Admin', AdminSchema);
const UserModel = mongoose.model('User', UserSchema);
const CourseModel = mongoose.model('Course', CourseSchema);

module.exports = {
    AdminModel,
    UserModel,
    CourseModel
}
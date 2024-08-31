import { CourseRegisterMail } from '../emails/Email.controller.js';
import Course from '../models/Course.model.js';

export const courseRegister = async(req, res) => {
  const { name, email, courseId, courseDuration, courseFee } = req.body;

  const newCourse = new Course({
    name,
    email,
    courseId,
    courseDuration,
    courseFee
  });

  try {
    const savedCourse = await newCourse.save();
    CourseRegisterMail(req, res);
    res.status(201).json({
      message: "User registered successfully",
      success: true,
      status: 201,
      data: savedCourse
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      status: 500
    });
  }
};
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
    unique: true,
  },
  courseDuration: {
    type: String,
    required: true,
  },
  courseFee: {
    type: String,
    required: true,
  }
},
{
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
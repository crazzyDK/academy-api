import Project from '../models/Project.model.js';

export const projectController = async(req, res) => {
  const { name, profilePic, code } = req.body;

  const newProject = new Project({
    name,
    profilePic,
    code
  }); 

  try {
    const savedUser = await newProject.save();
    return res.status(201).json({
      message: "Project added successfully",
      success: true,
      status: 201,
      // data: savedUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      status: 500
    });
  }
}
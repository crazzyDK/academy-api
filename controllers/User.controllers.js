import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';
import { RegisterMail } from '../emails/Email.controller.js';

export const userLogin = async(req, res) => {
  const { email, password } = req.body;

  const validUser = await User.findOne({ email});
  
  if (!validUser) {
    return res.status(404).json({
      message: "User not found",
      success: false,
      status: 404
    });
  };

  const isMatch = bcrypt.compareSync(password, validUser.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Incorrect password",
      success: false,
      status: 400
    });
  }

  try {
    // Generate JWT token
  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
  const { password: hashedPassword, ...rest} = validUser._doc;
  const expiryDate = new Date(Date.now() + 3600000);
  res
      .cookie('access_token', token, {httpOnly: true, expires: expiryDate})
      .status(200)
      .json({
        message: "Logged in successfully",
        success: true,
        status: 200,
        token,
        expiryDate,
        user: rest
      });
  } catch (error) {
    console.log(error);
  }

};

export const userRegister = async(req, res) => {
  const { name, email, password } = req.body;
  
  if (email) {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
        status: 400
      });
    }
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword
  });

  try {
    const savedUser = await newUser.save();
    RegisterMail(req, res);
    return res.status(201).json({
      message: "User registered successfully",
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
};
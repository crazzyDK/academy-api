import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';
import Token from '../models/UserToken.model.js';
import jwt from 'jsonwebtoken';
import { RegisterMail } from '../emails/Email.controller.js';
import generateToken from '../utils/generateToken.js';
import nodemailer from 'nodemailer';

// User Login
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
  return res
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

// User Registration
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

// User Request Reset Password
export const userReqPassword = async(req, res) => {
  const { email } = req.body;

  // Mail service
  let config = {
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass:  process.env.GMAIL_PASS,
    }
  }
  let transporter = nodemailer.createTransport(config);
  // check if user exists with given email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
      status: 404
    });
  }

  let token = await Token.findOne({ userId: user._id });
  if(token) {
    return res.status(400).json({
      message: "Reset password token already sent",
      success: false,
      status: 400
    });
  }
  if (!token) {
    token = new Token({
      userId: user._id,
      token: generateToken()
    });
    await token.save();
  }

  const resetLink = `${process.env.BASE_URL}/api/v1/users/reset-password/${user._id}/${token.token}`

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Reset Password",
    html: `
      <h1>Reset Password</h1>
      <p>Click on the link below to reset your password:</p>
      <a href=${resetLink}>Click Here</a>
    `
  })

  return res.status(200).json({
    message: "Reset password email sent successfully",
    success: true,
    status: 200,
    data: resetLink
  });
}

// User Update Password
export const userResetPassword = async(req, res) => {
  const {userId, token} = req.params;
  const { password } = req.body;

  const passResetPassword = await Token.findOne({ token });
  if (!passResetPassword) {
    return res.status(404).json({
      message: "Invalid token. Time expired",
      success: false,
      status: 404
    });
  }

  const user = await User.findById({ _id: passResetPassword.userId });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
      status: 404
    });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  user.password = hashedPassword;
  await user.save();
  await passResetPassword.deleteOne();

  return res.status(200).json({
    message: "Password updated successfully",
    success: true,
    status: 200,
  });
};
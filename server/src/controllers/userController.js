import { generateJwt, authenticateJWT } from "../middlewares/auth.js";
import User from "../models/userSchema.js";
import { sendMail } from "../utils/nodemailer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);
console.log(process.env.REDIRECT_URI)
const registerUser = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  if (!name || !email || !password || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "Some field are missing",
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User Already exists",
    });
  }

  const newUser = new User({
    name,
    email,
    password,
    phoneNumber
  });
  await newUser.save();

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
  console.log("generated token", token);
  console.log(email)
  await sendMail(
    email,
    "Welcome to our blog",
    `<h1>Verify Your Email</h1> <a href ="${process.env.FRONTEND_URI}/verify/${token}">Click here to verify your email</a>`
  );

  res.status(200).json({
    success: true,
    message: "Please check your email for verification link"
  });

};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Some field are missing",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }
  if (!user.isVerified) {
    return res.status(400).json({
      success: false,
      message: "User not verified",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid password",
    });
  }
  const token = generateJwt(user);
  res.cookie("token", token, {
    httpOnly: true,

    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  user.password = undefined;
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: user,
  });
}

const loginWithMagicLink = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }


  const token = generateJwt(email);
  await sendMail(
    email,
    "Magic Link Login",
    `${process.env.BACKEND_URI}/api/user/verify/${token}`,
  );

  res.status(200).json({
    success: true,
    message: "Magic link sent to your email",
    token: token,
  });
}

const googleLogin = (req, res) => {



  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  })

  console.log(url);
  res.redirect(url);
};

const googleCallback = async (req, res) => {


  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
  const userInfo = await oauth2.userinfo.get({ auth: oauth2Client });
  console.log(userInfo.data);

  const user = await User.findOne({ email: userInfo.data.email });
  if (user) {
    const token = generateJwt(user);
    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.FRONTEND_URI}?login=success`)
    return;
  }

  const newUser = new User({
    name: userInfo.data.name,
    email: userInfo.data.email,
    isVerified: true,
  })
  await newUser.save();
  const token = generateJwt(newUser);
  res.cookie("token", token, {
    httpOnly: false,
    sameSite: "none",
    secure: true,
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.redirect(process.env.FRONTEND_URI)
}

const verifyMagicLink = async (req, res) => {
  const { token } = req.params;

  const user = jwt.verify(token, process.env.JWT_SECRET);
  if (!user.email) {
    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }
  const newuser = await User.findOne({ email: user.email });
  if (!newuser) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }
  newuser.isVerified = true;
  await newuser.save();
  const newtoken = generateJwt(newuser);

  res.cookie("token", newtoken, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
  });


}

const LogOut = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
  });
  res.status(200).json({
    success: true,
    message: "User logged Out successfully",
  });
};

const sendVerificationEmail = async (req, res) => {
  console.log("send verification email hit ", req.body);
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }
  const token = generateJwt(email);
  await sendMail(
    email,
    "Verification Email",
    `<h1>Verify Your Email</h1> <a href ="${process.env.FRONTEND_URI}/verify/${token}">Click here to verify your email</a>`
  );
  res.status(200).json({
    success: true,
    message: "Verification email sent successfully",
  });
}



export {
  registerUser,
  loginUser,
  loginWithMagicLink,
  verifyMagicLink,
  sendVerificationEmail,
  LogOut,
  googleLogin,
  googleCallback
};
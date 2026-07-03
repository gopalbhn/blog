import { generateJwt, authenticateJWT, generateAccessToken, generateRefreshToken } from "../middlewares/auth.js";
import User from "../models/userSchema.js";
import { sendMail } from "../utils/nodemailer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { google } from "googleapis";



const registerUser = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  if (!name || !email || !password || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "Some field are missing",
    });
  }

  const userExists = await User.findOne({ email, isDeleted: false });

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
  let { email, password } = req.body;

  email = String(email)


  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Some field are missing",
    });
  }
  const user = await User.findOne({ email, isDeleted: false });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found Please Register",
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
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();


  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 15 * 60 * 1000
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
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

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);
  const state = crypto.randomUUID()
  console.log(state)
  res.cookie("oauth_state",state,{
    httpOnly:true,
    secure:true,
    sameSite:"lax",
    maxAge: 5*60*1000,
  })
  
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state
  })


  res.redirect(url);
};


const googleCallback = async (req, res) => {

  const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);
  const { code,state } = req.query;
  const storedState = req.cookies.oauth_state;
  if(state !== storedState){
    return res.status(400).json({
      success:false,
      message:"Invalid Oauth State",
  })
  }

  res.clearCookie("oauth_state");
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
  const userInfo = await oauth2.userinfo.get();

console.log("UserInfo",userInfo.data)

  if(!userInfo.data.verified_email){
       return res.status(403).json({
        success: false,
        message: "Google email is not verified",
      });
  }
  const user = await User.findOne({ email: userInfo.data.email });
  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();


    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 15 * 60 * 1000
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
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

  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
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
  console.log(req.user.id);
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  user.refreshToken = "";
  await user.save();
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
  });
  res.clearCookie("refreshToken", {
       httpOnly: true,
    secure: true,  
  });

  res.status(200).json({
    success: true,
    message: "User logged Out successfully",
  });
};

const sendVerificationEmail = async (req, res) => {

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
   generateJwt(email);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
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

const getInfo = async (req, res) => {
  try {
     
    const user = await User.findById({ _id: req.user.id }).select('-password -isDeleted')
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found"
      })
    }

    res.status(200).json({
      success: true,
      message: "User Found",
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


const refreshToken = async (req, res) => {

  try {

    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found"
      })
    }

    const IsVaildToken = await User.findOne({ refreshToken: token }).select("refreshToken")
    if (!IsVaildToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      })
    }


    const userData = jwt.verify(token, process.env.JWT_SECRET);
    if (!userData) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      })
    }

    const user = await User.findOne({ email: userData.email }).select("-isDeleted -password");

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 15 * 60 * 1000

    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000

    })
    res.status(200).json({
      success: true,
      message: "Refresh token rotated successfully"
    });


  } catch (error) {
    res.status(500).json({

    })
  }
}


export {
  registerUser,
  loginUser,
  loginWithMagicLink,
  verifyMagicLink,
  sendVerificationEmail,
  LogOut,
  googleLogin,
  googleCallback,
  getInfo,
  refreshToken
};
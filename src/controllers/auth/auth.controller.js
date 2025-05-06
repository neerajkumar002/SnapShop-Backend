import { User } from "../../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register user
const register = async (req, res) => {
  try {
    //get user data
    const { fullName, email, password } = req.body;
    //check  user is exists or not
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists with this same email address! Please try again",
      });
    }

    //password hashing
    const hashedPassowrd = await bcrypt.hash(password, 12);

    //create and save new user
    const newUser = new User({ fullName, email, password: hashedPassowrd });
    await newUser.save();

    return res
      .status(201)
      .json({ success: true, message: "User register successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" });
  }
};

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check user is exists or not
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "User dose not exists! Please register first!",
      });
    }

    //compare password
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );

    //Password dose not match
    if (!checkPasswordMatch) {
      return res.status(500).json({
        success: false,
        message: "Incorrect Password! Please try again ",
      });
    }

    // generate token
    const token = await jwt.sign(
      {
        id: checkUser._id,
        fullName: checkUser.fullName,
        email: checkUser.email,
        role: checkUser.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "60m",
      }
    );

    return res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully!",
      user: {
        id: checkUser._id,
        fullName: checkUser.fullName,
        email: checkUser.email,
        role: checkUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error :Login ",
    });
  }
};

//logout
const logout = async (req, res) => {
  try {
    return res
      .clearCookie("token")
      .status(200)
      .json({ success: true, message: "Logout successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error: logout" });
  }
};
//check auth
const checkAuth = async (req, res) => {
  try {
    const user = req.user;
    return res
      .status(200)
      .json({ success: true, message: "Authorized user!", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "unauthorized user!" });
  }
};

export { register, login, logout, checkAuth };

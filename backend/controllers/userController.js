import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import "dotenv/config";

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = createToken(user._id);
    res.json({ success: true, token, userId: user._id });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error",
    });
  }
};
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // checking this user already exist
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already Register" });
    }
    //validating email formate and strong formate
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a valid Email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please Enter a strong password ",
      });
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (err) {
    console.log(err);
    res, json({ success: false, message: "Error" });
  }
};
export { loginUser, registerUser };

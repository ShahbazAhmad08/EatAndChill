import Admin from "../model/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body.data;
  // console.log(req.body.data);

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

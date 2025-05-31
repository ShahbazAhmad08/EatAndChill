import jwt from "jsonwebtoken";
const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    console.log(token);
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
  // console.log(token);

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body = req.body || {};
    req.body.userId = token_decode.id;
    next();
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: "Error",
    });
  }
};
export default authMiddleware;

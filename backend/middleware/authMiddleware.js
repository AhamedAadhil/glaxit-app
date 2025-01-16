import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/*
middleware to verify the incoming token is present and  is valid 
*/
export const isValidToken = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(404)
        .json({ message: "No access token provided", success: false });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verifyToken) {
      return res.status(403).json({ message: "Invalid token", success: false });
    }
    req.user = verifyToken;
    next();
  } catch (error) {
    console.error("Token validation error:", error.message);
    return res.status(403).json({
      message: "Invalid or expired token!",
      success: false,
      error: error.message,
    });
  }
};

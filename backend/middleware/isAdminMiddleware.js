import dotenv from "dotenv";

dotenv.config();

/*
middleware to check if the incoming token is belongs to an admin account or not
*/
export const isAdmin = (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(404)
        .json({ message: "Token not provided!", success: false });
    }
    const isAdmin = user.isAdmin;
    if (isAdmin === 0) {
      return res
        .status(403)
        .json({ message: "Unauthorized access, protected route!" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

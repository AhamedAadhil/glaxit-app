import { connectDB } from "../config/db.js";
export const getProfile = (req, res) => {
  try {
    const sql = `SELECT * FROM company WHERE company_email = '${req.user.email}'`;
    connectDB.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message, success: false });
      } else {
        const { password, ...rest } = result[0];
        return res.status(200).json({ data: rest, success: true });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

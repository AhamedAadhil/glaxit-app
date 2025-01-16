import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

dotenv.config();

/*
controller for get company info using JWT token
localhost:3000/api/admin/get_info_by_token
*/
export const getInfoByToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res
      .status(404)
      .json({ message: "Token not Found!", success: false });
  }

  const decodedToken = jwt.decode(token);
  return res.status(200).json({ decodedToken, success: true });
};

/* 
controller for get pending Approvels of companies
localhost:3000/api/admin/get_pending_approvels
*/
export const getPendingApprovels = (req, res) => {
  try {
    // SQL query to join login and company tables
    const sql = `
      SELECT 
        login.login_id AS login_id,
        login.email,
        login.status,
        company.company_id,
        company.company_name,
        company.company_address,
        company.company_email
      FROM 
        login
      INNER JOIN 
        company
      ON 
        login.email = company.company_email
      WHERE 
        login.status = 0
    `;
    connectDB.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message, success: false });
      } else {
        // filter the password field from the result before send it as response
        const sanitizedResults = result.map(({ password, ...rest }) => rest);
        return res.status(200).json({ data: sanitizedResults, success: true });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.messsage, success: false });
  }
};

/*
controller for toggle Status of a company
localhost:3000/api/admin/toggle_status
*/
export const toggleStatus = (req, res) => {
  try {
    const { company_email } = req.body;
    const sql_getCompany = `SELECT * FROM login WHERE email = '${company_email}'`;
    connectDB.query(sql_getCompany, (err, result_get) => {
      if (err) {
        return res.status(401).json({ message: err.message, success: false });
      }
      if (result_get.length === 0) {
        return res
          .status(404)
          .json({ message: "Company not found", success: false });
      }
      // get the current status of the company
      const currentStatus = result_get[0].status;
      // toggle the status of the company
      const newStatus = currentStatus === 0 ? 1 : 0;

      // update the toggled status of the company in database
      const sql_updateCompany = `UPDATE login SET status = ${newStatus} WHERE email = '${company_email}'`;
      connectDB.query(sql_updateCompany, (err, result_update) => {
        if (err) {
          return res.status(401).json({ message: err.message, success: false });
        } else {
          return res.status(200).json({
            message: `Company status updated to ${
              newStatus === 0 ? "Inactive" : "Active"
            } !`,
            success: true,
          });
        }
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getAllCompanies = (req, res) => {
  try {
    const sql = `
      SELECT 
        login.login_id AS login_id,
        login.email,
        login.status,
        company.company_id,
        company.company_name,
        company.company_address,
        company.company_email
      FROM 
        login
      INNER JOIN 
        company
      ON 
        login.email = company.company_email
      WHERE 
        login.status = 1
    `;
    connectDB.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message, success: false });
      } else {
        return res.status(200).json({ data: result, success: true });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

import { connectDB } from "../config/db.js";
/*
Controller for login of company and super admin
localhost:3000/api/auth/login
*/
export const login = (req, res) => {
  // get user email from request body
  const { email } = req.body;
  //   check if user exists
  const sql = `SELECT * FROM login WHERE email = '${email}'`;
  connectDB.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
      if (result.length > 0) {
        // check if password is correct
        const decryptedPassword = bcrypt.compareSync(
          req.body.password,
          result[0].password
        );
        if (!decryptedPassword) {
          return res
            .status(401)
            .json({ message: "Invalid username or password", success: false });
        }
        // check if account is active
        if (result[0].status === 0) {
          return res
            .status(401)
            .json({ message: "Your account is not active", success: false });
        }
        // generate jwt token
        const token = jwt.sign(
          { email: result[0].email, isAdmin: result[0].isadmin },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        // check if the account is admin account or not
        const isAdmin = result[0].isadmin;
        const { password, isadmin, status, ...rest } = result[0];
        // set cookie with token
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 3600000, // 1 hour
        });
        res.status(200).json({
          info: rest,
          role: isAdmin === 0 ? "Company" : "Super Admin",
          token,
          message: `Welcome ${isAdmin ? "Admin!" : "!"}`,
          success: true,
        });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid username or password", success: false });
      }
    }
  });
};

/*
Controller for registration of a company
localhost:3000/api/auth/company_register
*/
export const company_register = async (req, res) => {
  // get company data from request body
  const { company_name, company_email, company_address, password } = req.body;
  // get document from request file
  const document = req.file;
  if (
    !company_name ||
    !company_address ||
    !company_email ||
    !password ||
    !document
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }
  // generate file path url of document
  let filePath = "";
  if (document) {
    filePath =
      req.protocol + "://" + req.get("host") + "/uploads/" + document.filename;
  }
  //   check if company exists
  const sql_check = `SELECT * FROM company WHERE company_email = '${company_email}'`;
  // console.log(document.path);
  connectDB.query(sql_check, (err, result) => {
    if (err) {
      res.status(400).json({ message: "Something went wrong", success: false });
      console.log(err);
      return;
    } else {
      if (result.length > 0) {
        res
          .status(400)
          .json({ message: "Company already exists", success: false });
        return;
      }
    }
  });
  //   hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  //   insert company data
  const sql_company = `INSERT INTO company (company_name,company_email,company_address, password,document_path) VALUES ('${company_name}', '${company_email}', '${company_address}', '${hashedPassword}', '${filePath}')`;
  connectDB.query(sql_company, (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
      // insert login data
      const sql_login = `INSERT INTO login (email, password,status) VALUES ( '${company_email}', '${hashedPassword}',0)`;
      connectDB.query(sql_login, (err, result_sqlLogin) => {
        if (err) {
          res
            .status(400)
            .json({ message: "Something went wrong", success: false });
          console.log(err);
          return;
        } else {
          return res.status(200).json({
            result_sqlLogin,
            message: "Registration details sent to Admin",
            success: true,
          });
        }
      });
    }
  });
};

/*
Controller for logout (simply clear the cookie)
localhost:3000/api/auth/logout
*/
export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful", success: true });
};

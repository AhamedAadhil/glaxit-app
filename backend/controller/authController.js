import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

import { connectDB } from "../config/db.js";

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
            .json({ message: "Invalid username or password" });
        }
        // check if account is active
        if (result[0].status === 0) {
          return res
            .status(401)
            .json({ message: "Your account is not active" });
        }
        // generate jwt token
        const token = jwt.sign(
          { email: result[0].email, isAdmin: result[0].isadmin },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        const isAdmin = result[0].isadmin;
        const { password, isadmin, status, ...rest } = result[0];
        res.status(200).json({
          info: rest,
          token,
          message: `Welcome ${isAdmin ? "Admin!" : "!"}`,
        });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
    }
  });
};

export const company_register = async (req, res) => {
  // get company data from request body
  const { company_name, company_email, company_address, password } = req.body;
  //   check if company exists
  const sql_check = `SELECT * FROM company WHERE company_email = '${company_email}'`;
  connectDB.query(sql_check, (err, result) => {
    if (err) {
      res.status(400).json({ message: "Something went wrong" });
      console.log(err);
      return;
    } else {
      if (result.length > 0) {
        res.status(400).json({ message: "Company already exists" });
        return;
      }
    }
  });

  //   hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  //   insert company data
  const sql_company = `INSERT INTO company (company_name,company_email,company_address, password) VALUES ('${company_name}', '${company_email}', '${company_address}', '${hashedPassword}')`;
  connectDB.query(sql_company, (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
      // insert login data
      const sql_login = `INSERT INTO login (email, password,status) VALUES ( '${company_email}', '${hashedPassword}',0)`;
      connectDB.query(sql_login, (err, result_sqlLogin) => {
        if (err) {
          res.status(400).json({ message: "Something went wrong" });
          console.log(err);
          return;
        } else {
          return res.status(200).json({
            result_sqlLogin,
            message: "Registration details sent to Admin",
          });
        }
      });
    }
  });
};

// export const superAdmin_login = (req, res) => {
//   const { admin_email, password } = req.body;

//   const sql_checkCredentials = `SELECT * FROM superadmin WHERE admin_email = '${admin_email}'`;
//   connectDB.query(sql_checkCredentials, (err, result) => {
//     if (err) {
//       console.log(err);
//       return;
//     } else {
//       if (result.length > 0) {
//         const decryptedPassword = bcrypt.compareSync(
//           password,
//           result[0].admin_password
//         );
//         if (!decryptedPassword) {
//           return res
//             .status(401)
//             .json({ message: "Invalid username or password" });
//         }

//         res.status(401).json({ message: "Welcome Super Admin!" });
//       } else {
//         res.status(401).json({ message: "Invalid username or password" });
//       }
//     }
//   });
// };

// export const company_login = (req, res) => {
//   const { company_website, password } = req.body;

//   const sql_checkCredentials = `SELECT * FROM company WHERE company_website = '${company_website}'`;
//   connectDB.query(sql_checkCredentials, (err, result) => {
//     if (err) {
//       console.log(err);
//       return;
//     } else {
//       if (result.length > 0) {
//         const decryptedPassword = bcrypt.compareSync(
//           password,
//           result[0].password
//         );
//         if (!decryptedPassword) {
//           return res
//             .status(401)
//             .json({ message: "Invalid username or password" });
//         }
//         const sql_checkStatus = `SELECT * FROM company_login WHERE company_website = '${company_website}'`;
//         connectDB.query(sql_checkStatus, (err, result_status) => {
//           if (err) {
//             console.log(err);
//             return;
//           } else {
//             if (result_status[0].status === 0) {
//               return res.status(200).json(result_status);
//             }
//             return res
//               .status(401)
//               .json({ message: "Your account is not active" });
//           }
//         });
//       } else {
//         res.status(401).json({ message: "Invalid username or password" });
//       }
//     }
//   });
// };

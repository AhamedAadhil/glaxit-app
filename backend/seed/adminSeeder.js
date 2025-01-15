import { connectDB } from "../config/db.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  const currentDate = new Date();
  const formatedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

  const password = process.env.SUPERADMIN_PASSWORD;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const sql_addAdminInfo = `INSERT INTO superadmin (admin_name,admin_address,admin_email, admin_password,created_at,updated_at) VALUES ('admin','PAK','4dm1n@example.com', '${hashedPassword}','${formatedDate}','${formatedDate}')`;
  connectDB.query(sql_addAdminInfo, (err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
      const sql_addLoginInfo = `INSERT INTO login (email, password,status,isadmin) VALUES ( '4dm1n@example.com', '${hashedPassword}',1,1)`;
      connectDB.query(sql_addLoginInfo, (err, result_addLoginInfo) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log(result_addLoginInfo);
        }
      });
    }
  });
};

seedAdmin();

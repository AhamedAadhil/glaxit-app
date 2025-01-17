import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// const fileFilter = (req, file, cb) => {
//   console.log(file.mimetype); // Log the MIME type
//   if (file.mimetype === "application/pdf") {
//     cb(null, true);
//   } else {
//   }
//   cb(new Error("Only PDF files are allowed!"));
// };

export const upload = multer({
  storage,
  //   fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

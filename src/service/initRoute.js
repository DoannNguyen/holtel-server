import express from "express";
import routerControl from "../controller/routeControl";
const router = express.Router();
import multer from "multer";
import appRoot from "app-root-path";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter });

const initRoute = (app) => {
  router.get("/users", routerControl.getHomePage);

  router.get("/hello", (req, res) => {
    res.send("hello page");
  });
  router.post("/create-user", routerControl.postCreateUser);
  router.get("/delete/:id", routerControl.deleteUser);
  router.get("/insert-avatar/:id", routerControl.insertAvatar);
  router.post(
    "/updateAvatar/:id",
    upload.single("avatarFile"),
    routerControl.uploadAvatar
  );
  router.post("/update-user", routerControl.postUpdateUser);
  router.get("/update/:id", routerControl.updateUser);

  return app.use("/holtel-server", router);
};

export default initRoute;

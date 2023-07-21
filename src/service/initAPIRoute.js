import express from "express";
import APIControl from "../controller/APIControl";
const router = express.Router();

const initApiRoute = (app) => {
  router.get("/users", APIControl.getAllUser);
  router.post("/add-user", APIControl.addUser);
  router.delete("/delete/:id", APIControl.deleteUser);
  router.put("/update-user/:id", APIControl.updateUser);

  return app.use("/api/v1", router);
};

export default initApiRoute;

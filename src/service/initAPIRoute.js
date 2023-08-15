import express from "express";
import APIControl from "../controller/APIControl";
const router = express.Router();

const initApiRoute = (app) => {
  router.get("/users", APIControl.getAllUser);
  router.post("/add-user", APIControl.addUser);
  router.delete("/delete/:id", APIControl.deleteUser);
  router.put("/update-user/:id", APIControl.updateUser);
  router.post("/login", APIControl.loginApp);
  router.get("/rooms", APIControl.getAllRoom);
  router.get("/getRoom/:id", APIControl.getRooomById);
  router.post("/book-room", APIControl.bookRoom);
  router.get("/room-booked/:id", APIControl.getRoomBooked);
  router.post("/deleteRoomBooked", APIControl.deleteRoomBooked);
  router.get("/kind-room", APIControl.getKindRoom);
  router.get("/getRate/:id", APIControl.getRate);
  router.post("/rate", APIControl.postRate);

  return app.use("/api/v1", router);
};

export default initApiRoute;

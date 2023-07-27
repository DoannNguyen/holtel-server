import pool from "../configs/connectionDB";

const getHomePage = async (req, res) => {
  let [rows, feilds] = await pool.execute("select * from users");
  return res.render("addUser.ejs", { dataUser: rows });
};

const postCreateUser = async (req, res) => {
  //localhost:3000/image/${req.file.filename}
  console.log(req.body);
  let { userName, password, rePassword, name, phoneNumber, address } = req.body;

  if (password === rePassword) {
    await pool.execute(
      "insert into users (name, phone, address, username, password) values ( ?, ?, ?, ?, ?)",
      [name, phoneNumber, address, userName, password]
    );
    res.redirect("/holtel-server/users");
  } else {
    res.status(422).json({ error: "passwords not match" });
  }
};

// `localhost:3000/image/${req.file.filename}`;

const deleteUser = async (req, res) => {
  const id = req.params.id;
  await pool.execute("delete from users where id = ?", [id]);
  res.redirect("/holtel-server/users");
};

const insertAvatar = async (req, res) => {
  const id = req.params.id;

  res.render("insertAvatar.ejs", { id: id });
};

const uploadAvatar = async (req, res) => {
  const id = req.params.id;
  const path = `/image/${req.file.filename}`;
  await pool.execute("update users set avatar = ? where id = ?", [path, id]);

  res.redirect("/holtel-server/users");
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  console.log("check id", id);
  const [rows, fields] = await pool.execute(
    "select * from users where id = ?",
    [id]
  );
  console.log(rows);
  res.render("updateUser.ejs", { dataUser: rows });
};

const postUpdateUser = async (req, res) => {
  const { id, userName, password, name, phoneNumber, address } = req.body;
  await pool.execute(
    "update users set name = ?, phone = ?, address = ?, username = ?, password = ?  where id = ?",
    [name, phoneNumber, address, userName, password, id]
  );
  res.redirect("/holtel-server/users");
};

const getFormAddRoom = async (req, res) => {
  const [rows, fields] = await pool.execute("select * from kindrooms");
  const [rooms, feilds2] = await pool.execute("select * from rooms");
  console.log(rooms);

  return res.render("addRoomForm.ejs", { data1: rows, data2: rooms });
};

const postCreateRoom = async (req, res) => {
  const roomNum = req.body.roomNum;
  const idKindRoom = req.body.idKindRoom;
  const price = req.body.price;
  const imageRoom = `/image/${req.file.filename}`;
  const decription = req.body.description;

  await pool.execute(
    "insert into rooms (imageRoom, roomNum, description, price, idKindRoom ) values (?,?,?,?,?)",
    [imageRoom, roomNum, decription, price, idKindRoom]
  );
  res.redirect("/holtel-server/form-add-room");
};

module.exports = {
  getHomePage,
  postCreateUser,
  deleteUser,
  insertAvatar,
  uploadAvatar,
  updateUser,
  postUpdateUser,
  getFormAddRoom,
  postCreateRoom,
};

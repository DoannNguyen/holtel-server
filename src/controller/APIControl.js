import pool from "../configs/connectionDB";

const getAllUser = async (req, res) => {
  const [rows, fields] = await pool.execute("select * from users");
  return res.status(200).json({
    messange: "ok",
    data: rows,
  });
};

const addUser = async (req, res) => {
  console.log("add user", req.body);
  let { username, password, name, phone, address } = req.body;
  await pool.execute(
    "insert into users (name, phone, address, username, password) values ( ?, ?, ?, ?, ?)",
    [name, phone, address, username, password]
  );
  res.send(req.body);
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  await pool.execute("delete from users where id = ?", [id]);
  res.send("ok");
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  console.log("check id: ", id);
  const { username, password, name, phone, address } = req.body;
  await pool.execute(
    "update users set name = ?, phone = ?, address = ?, username = ?, password = ?  where id = ?",
    [name, phone, address, username, password, id]
  );
  res.send(req.body);
};

const loginApp = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const [rows, fields] = await pool.execute(
    "select * from users where username = ? and password = ?",
    [username, password]
  );
  console.log(rows);
  if (rows.length != 0) {
    return res.send(rows[0]);
  } else {
    return res.send("not user");
  }
};

const getAllRoom = async (req, res) => {
  const [data, feilds1] = await pool.execute(
    "select a.idRoom, a.imageRoom, a.roomNum, a.description, a.price, b.nameOfKind from rooms a inner join kindrooms b on a.idKindRoom = b.id where a.status = ?",
    [0]
  );
  res.send(data);
};
const getRooomById = async (req, res) => {
  const id = req.params.id;
  const [rows, fields] = await pool.execute(
    "select * from rooms where idRoom = ?",
    [id]
  );
  res.send(rows);
};
const bookRoom = async (req, res) => {
  const { fromDay, toDay, idRoom, idUser, price } = req.body;
  console.log(req.body);
  await pool.execute(
    "insert into roombooked (fromDay, toDay, idRoom, idUser, price) values (?, ?, ?, ?, ?)",
    [fromDay, toDay, idRoom, idUser, price]
  );
  await pool.execute("update rooms set status = ? where idRoom = ?", [
    -1,
    idRoom,
  ]);
  res.send(req.body);
};

const deleteRoomBooked = async (req, res) => {
  const { id, idRoom } = req.body;
  await pool.execute("delete from roomBooked where id = ?", [id]);
  await pool.execute("update rooms set status = ? where idRoom = ?", [
    0,
    idRoom,
  ]);
  res.send(req.body);
};

const getRoomBooked = async (req, res) => {
  const id = req.params.id;
  const [rows, fields] = await pool.execute(
    "select a.id, a.fromDay, a.toDay, a.price, a.idRoom, b.imageRoom, b.roomNum from roomBooked a inner join rooms b on a.idRoom = b.idRoom where idUser = ?",
    [id]
  );
  res.send(rows);
};

const getKindRoom = async (req, res) => {
  const [rows, fields] = await pool.execute("select * from kindrooms");
  res.send(rows);
};

const getRate = async (req, res) => {
  const id = req.params.id;
  const [rows, fields] = await pool.execute(
    "select a.description, a.id, b.roomNum, c.name from rooms b inner join rates a on a.idRoom = b.idRoom inner join users c on a.idUser = c.id where b.idRoom = ?",
    [id]
  );
  res.send(rows);
};

const postRate = async (req, res) => {
  const { description, idRoom, idUser } = req.body;
  console.log(req.body);
  const [rows, fields] = await pool.execute(
    "insert into rates (description , idRoom, idUser) values (?, ?, ?)",
    [description, idRoom, idUser]
  );
  res.send(rows);
};

module.exports = {
  getAllUser,
  addUser,
  deleteUser,
  updateUser,
  loginApp,
  getAllRoom,
  bookRoom,
  deleteRoomBooked,
  getRoomBooked,
  getKindRoom,
  getRate,
  postRate,
  getRooomById,
};

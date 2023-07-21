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
  // let { username, password, name, phone, address } = req.body;
  // await pool.execute(
  //   "insert into users (name, phone, address, username, password) values ( ?, ?, ?, ?, ?)",
  //   [name, phone, address, username, password]
  // );
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
  console.log(req.body);
};

module.exports = {
  getAllUser,
  addUser,
  deleteUser,
  updateUser,
};

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
    "select a.idRoom, a.imageRoom, a.roomNum, a.description, a.price, b.nameOfKind from rooms a inner join kindrooms b on a.idKindRoom = b.id where a.status = ?",[0]
  );
  console.log("check data ", data);
  res.send(data);
};

const bookRoom = async (req,res) => {
  const {fromDay, toDay, idRoom, idUser, price} = req.body;
  console.log(req.body)
  await pool.execute('insert into roombooked (fromDay, toDay, idRoom, idUser, price) values (?, ?, ?, ?, ?)', 
  [fromDay, toDay, idRoom, idUser,price]);
  await pool.execute('update rooms set status = ? where idRoom = ?', [-1, idRoom])
  res.send(req.body);
}

const updateRoomBooked = async (req, res) => {

}

const getRoomBooked = async (req,res) => {
  const id = req.params.id;
  const [rows, fields] = await pool.execute('select * from roomBooked where idUser = ?', [id]);
  res.send(rows);
}

module.exports = {
  getAllUser,
  addUser,
  deleteUser,
  updateUser,
  loginApp,
  getAllRoom,
  bookRoom,
  updateRoomBooked,
  getRoomBooked
};

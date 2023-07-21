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

module.exports = {
  getHomePage,
  postCreateUser,
  deleteUser,
  insertAvatar,
  uploadAvatar,
  updateUser,
  postUpdateUser,
};

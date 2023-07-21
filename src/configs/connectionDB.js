// get the client
import mysql from "mysql2/promise";

// create the connection to database
console.log("create pool..");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "hoteldatabase",
});

// // simple query
// connection.query("SELECT * FROM rooms", function (err, results, fields) {
//   console.log(results); // results contains rows returned by server
//   console.log(fields); // fields contains extra meta data about results, if available
// });

export default pool;

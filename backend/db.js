const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dashboard_app"
});

db.connect((err) => {
  if (err) {
    console.log("Database gagal konek");
    console.log(err);
  } else {
    console.log("Database terhubung");
  }
});

module.exports = db;
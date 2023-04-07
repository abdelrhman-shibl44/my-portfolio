
const mysql = require("mysql2");
require("dotenv").config()
// create pool to connection database
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS
});
// render home page
exports.home = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err //not connected
    console.log("connected to database from view:" + connection.threadId);
    // user the connection 
    connection.query('SELECT * FROM projects WHERE status = "active"', (err, rows) => {
      // when done with connection realse it 
      connection.release();
      if (!err) {
        const removedProject = req.query.removed || null;
        res.render('home', { rows, removedProject });
      } 
      console.log(err)
    });
  });
}
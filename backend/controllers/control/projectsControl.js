
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
// render addProjectForm 
exports.form = (req,res) => {
  res.render("addProject")
}

//--------- addNew Project to database----------
exports.add = (req, res) => {
  let { type, name, link,sort_order, description } = req.body
  console.log(type, name, link, description,sort_order)
  type = type.trim();
  name = name.trim();
  link = link.trim();
  description = description.trim();
  // let imagePath = null;
  // if (req.file) {
  //     imagePath = req.file.destination.replace("../public", "") + '/' + req.file.filename;
  // }
  pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log("connected database" + connection.threadId);
      const sql = "INSERT INTO projects SET type = ?, name = ?, link = ?, sort_order = ?, description = ?";
      connection.query(sql, [type, name, link, sort_order, description], (err, result) => {
          connection.release();
          if (!err) {
              res.render("addProject", { alert: `project ${name} successfuly added` });
          } else {
              res.send("Error when adding project");
          };
      });
  });
};
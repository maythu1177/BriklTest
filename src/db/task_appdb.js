const mysql = require("mysql2");

require('dotenv').config();

module.exports.con = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: false,
  connectionLimit: 100,
  queueLimit: 0,
  debug: false,
  multipleStatements: true,
  connectTimeout: 120000,
});



module.exports.addList = ({ title }) => {
  const query = `insert into list(title) values (?)`;
  const q = this.con.promise().query(query, [title]);
  this.con.releaseConnection(this.con);
  return q;
}

module.exports.getAllList = () => {
  const query = `select * from list order by id asc`;
  const q = this.con.promise().query(query);
  this.con.releaseConnection(this.con);
  return q;
}

module.exports.addTask = ({list_id,title,status}) => {
  const query = `insert into task(list_id,title,status) values (?,?,?)`;
  const q = this.con.promise().query(query, [list_id,title,status]);
  this.con.releaseConnection(this.con);
  return q;
}

module.exports.updateTask = ({id,list_id,title,status}) => {
  const query = `update task set list_id=?, title=?, status=? where id=?`;
  const q = this.con.promise().query(query, [list_id,title,status,id]);
  this.con.releaseConnection(this.con);
  return q;
}

module.exports.getTaskById = ({ id }) => {
  const query = `select * from task where id=?`;
  const q = this.con.promise().query(query, [id]);
  this.con.releaseConnection(this.con);
  return q;
}

module.exports.getAllTask= () => {
  const query = `select * from task order by id`;
  const q = this.con.promise().query(query);
  this.con.releaseConnection(this.con);
  return q;
}


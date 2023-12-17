const mysql = require('mysql')
require("dotenv").config();
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL");
  });

const executeQuery = (sql, values) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

const userDetails = async (req, res, next) => {
    try{
        console.log(req.body)
        const {username, email, age} = req.body;
        const result = await executeQuery(
            "INSERT INTO UserDetails (username, email, age) VALUES (?, ?, ?)",
            [username, email, age]
        );
        return res.status(201).json({ status: true, result});
    }catch(er){
        next(er);
    }
};

module.exports = {userDetails};
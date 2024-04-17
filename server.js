const express = require('express')
const app = express()
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodedb1"
});
con.connect(function(err) {
  if(err) throw err;
  console.log("Connected")
});
app.use(express.json);

// GET method route
app.get('/api/products', (req, res) => {
    con.query("SELECT * FROM products", function(err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
  });

// POST method route
app.post('/api/products', (req, res) => {
  var sql = "INSERT INTO products SET ?";
  var data = {
    Name:req.body.Name,
    Price:req.body.Price,
    Active:req.body.Active
  };
  con.query (sql, data, function(err, result) {
    if (err) throw err;
    console.log("number of recorded inserted: " + result.affectedRows);
  });
  res.json(data);
})
// GET ID method route
app.get('/api/products/:id', (req, res) => {
    con.query("SELECT * FROM products WHERE id = ?", function(err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
  });
  // PUT method route
  app.patch('/api/products/=id', (req, res) => {
    var id = req.body.id;
    var sql = "UPDATE products SET ? WHERE id=" +id;
    var data = {
      Name:req.body.Name,
      Price:req.body.Price,
      Active:req.body.Active
    };
    con.query (sql, data, function(err, result) {
      if (err) throw err;
      console.log("number of recorded inserted: " + result.affectedRows);
    });
    res.json(data);
  })
//DELETE method route
app.delete('/api/products/=id', (req, res) => {
  con.query("DELETE FROM products WHERE id=?", function(err, result, fields){
    if (err) throw err;
    console.log(result);
    res.json(result);
  })
})

app.listen(8080);
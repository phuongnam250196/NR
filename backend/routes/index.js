var express = require('express');
var router = express.Router();

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: 'admin123',
  port: 5432,
})


/* GET home page. */
router.get('/', function(req, res, next) {

});

// get data
router.get('/getdata', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
    
  pool.query('SELECT * FROM product_info', (error, response) => {
    if (error) {
      console.log(error)
    } else {
      console.log(response.rows);
      res.send(response.rows);
    }
    // pool.end();
  });
});

router.get('/add', function(req, res, next) {
  res.render("add", {});
});
router.post('/add', function(req, res, next) {
  var product_name = req.body.product_name, product_price = req.body.product_price, image = req.body.image;
  pool.query("INSERT INTO product_info (product_name,product_price,image) VALUES ($1,$2,$3)", [product_name,product_price,image], (err, respon) => {
    if (err) {
      res.send(err)
    } else {
      res.send("Đã insert dữ liệu thành công ! " + req.body.product_name + req.body.product_price + req.body.image);
    }
  })
});

module.exports = router;

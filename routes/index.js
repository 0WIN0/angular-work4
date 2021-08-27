var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var c =  mysql.createPool({
  connecttionLimit: 100,
  host:'localhost',
  user: 'root',
  password: '',
  database: 'db_workshop'
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/insert',(req,res,next) => {
  c.query('INSERT INTO tb_phonebook SET ?' , req.body,(err,rs) =>{
    if(err) throw err;
    res.send(rs)
  })
});
router.get('/phonebookAll',(req,res,next)=>{
  c.query('SELECT * FROM tb_phonebook', (err,rs) =>{
    if(err) throw err;
    res.send(rs);
  })
})
router.get('/phonebookInfo/:id',(req,res,next)=>{
  c.query('SELECT * FROM tb_phonebook WHERE id = ?',[req.params.id], (err,rs) =>{
    if(err) throw err;
    res.send(rs);
    })
  })
router.post('/phonebookDelete/:id',(req,res,next)=>{
  c.query('DELETE FROM tb_phonebook WHERE id = ?',[req.params.id], (err,rs) =>{
    if(err) throw err;
    res.send(rs);
    })
  })
  router.post('/phonebookEdit/:id',(req,res,next)=>{
    c.query('UPDATE tb_phonebook SET ? WHERE id = ?',[req.body,req.params.id], (err,rs) =>{
      if(err) throw err;
      res.send(rs);
      })
    })
module.exports = router;

var express = require("express");
var router = express.Router();
var pool = require("./pool.js");
var upload = require('./upload.js');
var jwt=require("jsonwebtoken");
var LocalStorage=require('node-localstorage').LocalStorage;
localStorage= new LocalStorage('./scratch');

/* GET users listing. */
router.post("/checklogin", function (req, res, next) {
  console.log(req.query)
  pool.query(
    "select * from adminregistration where email=? and password=?",
    [req.body.email,req.body.password],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ result: false });
      } else {
         console.log(req.body);
        if (result.length == 1)
          res.status(200).json({ result: true, data: result[0] });
        else res.status(200).json({ result: false });
      }
    }
  );
});
router.post("/addnewdetail", upload.any(), function (req, res, next) {
  pool.query(
    "insert into adminregistration (image,name,email,password) values(?,?,?,?)",
    [
      req.files[0].originalname,
      req.body.name,
      req.body.email,
      req.body.password,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});

router.post('/displayproductbysignup',function(req,res,next){
  console.log(req.body)
  pool.query("select * from uploadproduct where id=?",[req.body.id],function (error,result) {
      if (error) {
          res.status(500).json({ result: false });
      }
      else {
      
          res.status(200).json(result);
      }  
  })
  
})

router.get('/assignToken',function(req,res){
  try{
  var token=jwt.sign({id:100},'itmuniversegwaliormadhyapradesh',{expiresIn:'20s'})
  console.log(token)
 
  res.status(200).json({access_token:token})

  }
  catch(e){
      console.log("GET TOKEN:",e)
  res.status(500).json({access_token:null})


  }

})


module.exports = router;

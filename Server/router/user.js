const express = require("express")
const db = require("../db")
const utils = require("../utils")

const router = express.Router()

router.get("/getAll", (request, response) => {
    const statement = "SELECT * FROM User";
    db.query(statement, (error, result) => {
      response.send(utils.createResult(error, result));
    });
  });

  router.post("/insert", (request, response) => {
    const { name, email, password, phone, address } = request.body
    db.query(
      "INSERT INTO User(name, email, password, phone, address ) VALUES(?,?,?,?,?)",
      [name, email, password, phone, address ],
      (error, result) => {
        response.send(utils.createResult(error, result))
      }
    )
  })

  

  router.post("/update",(request,response)=>
{
    const{name,email,password,phone,address,userId}=request.body
    console.log(name,email,password,phone,address,userId);
    console.log("request coming");
    db.query("UPDATE User set name=?,email=?,password=?,phone=?,address=? where userId=?",
    [name, email, password, phone, address, userId],(error,result)=>
    {
        response.send(utils.createResult(error, result))
     
    })
})



router.delete("/delete/:userId", (request, response) => {
    const userId = request.params.userId;
    const deleteQuery = "DELETE FROM User WHERE userId = ?";
  
    db.query(deleteQuery, [userId], (error, result) => {
      if (error) {
        response.send(utils.createResult(error));
      } else if (result.affectedRows === 0) {
        response.send(utils.createResult("User not found"));
      } else {
        response.send(utils.createResult(null, "User deleted successfully"));
      }
    });
  });
  
  

  router.get("/:userId", (request, response) => {
    const userId = request.params.userId
    const statement = `SELECT * FROM User WHERE userId=?`
    db.query(statement, [userId], (error, result) => {
      response.send(utils.createResult(error, result))
    })
  })


  module.exports=router;
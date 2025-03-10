const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
 
const db = mysql.createConnection({
    user:"root",
    host:"127.0.0.1",
    port: 3307,
    password:"",
    database:"felveteli"
})
 
app.get("/",(req,res)=>
{
    res.send("Fut a Backend")
})
 
//app.get ("/diakok",( req, res) => {
    //const sql ="SELECT * FROM `diakok`";
    //db.query(sql, (err,result) => {
        //if (err) return res.json(err);
       // return res.json(result)
    //})
//})

app.get("/diakok", (req, res) => {
    const sql = "SELECT * FROM `diakok` ORDER BY nev ASC";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});
 
app.listen(3059, ()=>
{
    console.log("A szerverem a 3059 porton fut")
})



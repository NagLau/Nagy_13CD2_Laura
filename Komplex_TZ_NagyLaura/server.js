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
});
 
app.get("/",(req,res)=>
{
    res.send("Fut a Backend")
});
 
//app.get ("/diakok",( req, res) => {
    //const sql ="SELECT * FROM `diakok`";
    //db.query(sql, (err,result) => {
        //if (err) return res.json(err);
       // return res.json(result)
    //});
//});

app.get("/diakok", (req, res) => {
    const sql = "SELECT * FROM `diakok` ORDER BY nev ASC";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get("/agazat", (req, res) => {
    const sql = "SELECT * FROM `tagozatok` WHERE agazat = ? ORDER BY pontszam DESC";
    db.query(sql, [tagozatok], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get("/lekerdezes_", (req, res) => {
    const sql = `SELECT d.nev, t.agazat, (d.hozott + d.kpmagy + d.kpmat) AS osszpont FROM felveteli.jelentkezesek j JOIN felveteli.diakok d ON j.diak = d.oktazon JOIN felveteli.tagozatok t ON j.tag = t.akod ORDER BY d.nev ASC;`;
 
    db.query(sql, (err, result) => {
        if (err) {
            console.error("SQL Hiba:", err);
            return res.status(500).json({ error: "Adatbázis lekérdezési hiba!" });
        }
        return res.json(result);
    });
});
 
app.get("/lekerdezes__", (req, res) => {
    const sql = `SELECT t.agazat, COUNT(j.diak) AS jelentkezok_szama, SUM(d.hozott + d.kpmagy + d.kpmat) AS osszpontszam FROM felveteli.jelentkezesek j JOIN felveteli.diakok d ON j.diak = d.oktazon JOIN felveteli.tagozatok t ON j.tag = t.akod WHERE t.nyek = 1 GROUP BY t.agazat ORDER BY jelentkezok_szama DESC;`;
 
    db.query(sql, (err, result) => {
        if (err) {
            console.error("SQL Hiba:", err);
            return res.status(500).json({ error: "Adatbázis lekérdezési hiba!" });
        }
        return res.json(result);
    });
});

app.listen(3059, ()=>
{
    console.log("A szerverem a 3059 porton fut")
});



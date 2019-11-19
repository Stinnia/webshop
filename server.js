require('./db');
const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const path = require("path");
const mssql = require('mssql');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

app.listen(3000);

app.use(express.static(path.join(__dirname, 'app')));

app.get("/getAllPhones", async (req, res) => {
    res.json(await getDataPhonesDB())
});

async function getDataPhonesDB() {
    try {
        const result = (await mssql.query `select * from dbo.webshop`).recordset
        return result
    } catch (err) {
        console.log(err);
    }
}

app.post("/savephone", async (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let price = req.body.price;
    savePhoneDB(title, description, price, id)

    res.json(
        {"successful": "You have successfully created a new product"}
    )
});

async function savePhoneDB(title, description, price) {
    try {
        const result = (await mssql.query `INSERT INTO dbo.webshop (title, description, price)
        VALUES (${title}, ${description}, ${price});`).recordset
    } catch (err) {
        console.log(err)
    }
}
app.get("/deletePhones", async (req, res) => {
    res.json(await getDataPhonesDB())
});

async function deleteDataPhonesDB(id) {
    try {
        const result = (await mssql.query `DELETE FROM dbo.webshop WHERE id = ${id};`).recordset
    } catch (err) {
        console.log(err);
    }
}
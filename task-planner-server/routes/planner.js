
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { slot1Table, slot2Table, slot3Table, itemsTable } = require('../utils/tables.js');

const router = express.Router();
router.use(express.static('client'));
router.use(express.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xP0#123456',
    database: 'yip'
});

// Create all ntables here
router.post('/', async (req, res) => {
    const qry = [slot1Table, slot2Table, slot3Table, itemsTable];
    for(let i=0;i<qry.length;i++){
        try {
            await con.query(qry[i]);
        } catch (error) {
            console.log(error);
            res.json({status: false});
        }
    }
    res.json({status: true, });
});

module.exports = router;


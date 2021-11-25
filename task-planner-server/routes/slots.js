
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

// The data from planner is saved here

router.post('/', async (req, res) => {
    const keys = Object.keys(req.body).map(async(key) => {
        const customer_id = req.body[key].id;
        const customer_name = req.body[key].name;
        const pickup_location = req.body[key].pickup;
        const dropoff_location = req.body[key].dropoff;
        const date_recieved = req.body[key].date1;
        const date_due = req.body[key].date2;
        const slot = req.body[key].slot;

        const insertSlot = `INSERT INTO ${slot} 
        (
            customer_id, customer_name, pickup_location, dropoff_location, date_recieved, date_due
        ) VALUES (?,?,?,?,?,?)`;

        const insertToAllItems = `INSERT INTO all_items (customer_id, slot) VALUES (?,?)`;

        try {
            await con.query(insertSlot, 
                [customer_id, customer_name, pickup_location, dropoff_location, date_recieved, date_due]);
                console.log(`inserted to ${slot}`);
        } catch (error) {
            console.log(error);
            res.json({status: false, reason: `Could not insert to ${slot}`});
        }

        try {
            await con.query(insertToAllItems, [customer_id, slot]);
            console.log(`inserted to all_items`);
        } catch (error) {
            console.log(error);
            res.json({status: false, reason: "Could not insert to all_items"});
        }
    });
    res.json({status: true});
});

module.exports = router;


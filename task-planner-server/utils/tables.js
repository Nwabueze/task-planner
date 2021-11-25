// Schema for users table
const usersTable = `CREATE TABLE IF NOT EXISTS users 
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE KEY, 
    password VARCHAR(300) NOT NULL
)`;

// goods: {'id': {pick_up_location: loc, drop_off_location: loc, gods: goods, shipping_status: 0}}
// shipping_status shows if a customer has an impending shipment not yet attended to
const customersTable = `CREATE TABLE IF NOT EXISTS shipping_customers 
(
    id INT,
    goods JSON,
    shipping_status VARCHAR(50) DEFAULT 'INACTIVE',
    FOREIGN KEY (id) REFERENCES users(id),
    FOREIGN KEY (email) REFERENCES users(email)
)`;

const testTable = `CREATE TABLE IF NOT EXISTS test (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    jsn JSON
)`;

const customersTable2 = `CREATE TABLE IF NOT EXISTS customers2 
(
    id INT,
    name VARCHAR(255),
    goods JSON,
    shipping_status VARCHAR(50) DEFAULT 'ACTIVE'
)`;

const slot1Table = `CREATE TABLE IF NOT EXISTS slot1 
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customer_id VARCHAR(100) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    pickup_location VARCHAR(100) NOT NULL,
    dropoff_location VARCHAR(100) NOT NULL,
    date_recieved VARCHAR(100) NOT NULL,
    date_due VARCHAR(100) NOT NULL,
    shipping_status VARCHAR(50) DEFAULT 'STAGE_0'
)`;

const slot2Table = `CREATE TABLE IF NOT EXISTS slot2 
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customer_id VARCHAR(100) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    pickup_location VARCHAR(100) NOT NULL,
    dropoff_location VARCHAR(100) NOT NULL,
    date_recieved VARCHAR(100) NOT NULL,
    date_due VARCHAR(100) NOT NULL,
    shipping_status VARCHAR(50) DEFAULT 'STAGE_0'
)`;

const slot3Table = `CREATE TABLE IF NOT EXISTS slot3 
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customer_id VARCHAR(100) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    pickup_location VARCHAR(100) NOT NULL,
    dropoff_location VARCHAR(100) NOT NULL,
    date_recieved VARCHAR(100) NOT NULL,
    date_due VARCHAR(100) NOT NULL,
    shipping_status VARCHAR(50) DEFAULT 'STAGE_0'
)`;

const itemsTable = `CREATE TABLE IF NOT EXISTS all_items 
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customer_id VARCHAR(100) UNIQUE KEY NOT NULL,
    slot VARCHAR(255) NOT NULL
)`;

module.exports = { usersTable, customersTable, customersTable2, testTable, slot1Table, slot2Table, slot3Table, itemsTable};
const express = require('express');
const cors = require('cors');
const app = new express();
app.use(cors());
// make request to planner to create the required tables
app.use('/api/planner', require('./routes/planner.js'));
app.use('/api/slots', require('./routes/slots.js'));

app.use((req, res) => {
    res.status(404)
        .send('This page cannot be found');
});

let server = app.listen(8000, () => {
    console.log('Listening', server.address().port);
});

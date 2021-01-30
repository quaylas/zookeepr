const { create } = require('domain');
const express = require('express');
const fs = require('fs');
const path = require('path');

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const { animals } = require('./data/animals.json');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
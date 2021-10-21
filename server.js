const express = require('express');
const {writeFile} = require('fs');
const routes = require('./routes/router');

const app = express();
const port = 5000;
const domain = '/books';

// Parsing the body
app.use(express.json());

// Defining routes
app.use(routes);
app.use((req, res) => {
    res.status(404).json({
        message: `Ups, resource not found!`
    });
});

// Starting the server
app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});
const express = require('express');
const app = express();
const port = 5000;

// Router
const routes = require('./api/routes/apiRoutes');

// Parsing the body
app.use(express.json());

// Defining routes
app.use(routes);
app.get('/', (rep, res) => {
    res.send('Server ready');
});

app.use((req, res) => {
    res.status(404).json({
        message: `Ups, resource not found!`
    });
});

// Starting the server
app.listen(port, () => {
    console.log(`Server listening at url: http://localhost:${port}`);
});
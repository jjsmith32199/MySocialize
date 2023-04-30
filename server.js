const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(routes);


// Default response for any other request (Not Found)
app.get('/', (req, res) => {
    res.send("Welcom to MySocialize")
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server listening on https://localhost:${PORT}.`);
    });
});

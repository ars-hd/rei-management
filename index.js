const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended:true }));

let PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("200")
});


app.listen(PORT)
module.exports = app;

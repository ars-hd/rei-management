const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Lead, Client } = require('./models');
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('Error connecting to MongoDB Atlas:', error.message));

app.get('/', (req, res) => {
    res.send("200")
});



app.post('/add_lead', async (req, res) => {
    let { client, first_name, last_name, email, mobile, address } = req.query;
    try {
        const lead = new Lead({
            client: client,
            first_name: first_name,
            last_name: last_name,
            email: email,
            mobile: mobile,
            address: address
        });
        await lead.save();
        res.status(201).send(lead);

    } catch (error) {
    res.status(400).send(error.message);
    }
})

app.get('/leads', async (req, res) => {
    try {
        const leads = await Lead.find({}).where('client').equals(req.query.client);
        res.status(200).send(leads);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.post('/add_client', async (req, res) => {
    let { client, first_name, last_name, email, mobile, company } = req.query;
    try {
        const client = new Client({
            client: client,
            first_name: first_name,
            last_name: last_name,
            email: email,
            mobile: mobile,
            company: company
        });
        await client.save();
        res.status(201).send(client);

    } catch (error) {
    res.status(400).send(error.message);
    }
});

app.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).send(clients);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;

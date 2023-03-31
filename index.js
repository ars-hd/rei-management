const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Lead, Client, Campaign, KPIs } = require('./models');
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
    let { client, first_name, last_name, email, mobile, address, notes, status, campaign } = req.query;
    try {
        const lead = new Lead({
            client: client,
            first_name: first_name,
            last_name: last_name,
            email: email,
            mobile: mobile,
            address: address,
            notes: notes,
            campaign: campaign || 'NULL',
            status: status || 'Warm'
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
app.get('/leads/status', async (req, res) => {
    try {
        const leads = await Lead.find({}).where('status').equals(req.query.status);
        res.status(200).send(leads);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.post('/add_client', async (req, res) => {
    let { client, first_name, last_name, email, mobile, company, password } = req.query;
    try {
        const cliente = new Client({
            client: client,
            first_name: first_name,
            last_name: last_name,
            email: email,
            mobile: mobile,
            company: company,
            password: password || 'P@ssword1'
        });
        await cliente.save();
        res.status(201).send(cliente);

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

app.post('/add_campaign', async (req, res) => {
    let { client, name, status, prospects, messages } = req.query;
    try {
        const campaign = new Campaign({
            client: client,
            name: name,
            status: status || "Active",
            prospects: prospects,
            messages: messages
        });
        await campaign.save();
        res.status(201).send(campaign);

    } catch (error) {
    res.status(400).send(error.message);
    }
})
app.get('/campaigns', async (req, res) => {
    try {
        const campaigns = await Campaign.find({}).where('client').equals(req.query.client);
        res.status(200).send(campaigns);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/add_kpis', async (req, res) => {
    let { client, campaign, prospects, messages, leads, dnc, not_interested, replied, not_reachable, no_response, follow_up, type } = req.query;
    try {
        const kpis = new KPIs({
            client: client,
            campaign: campaign,
            type: type || "Text",
            prospects: prospects,
            messages: messages,
            leads: leads,
            dnc: dnc,
            not_interested: not_interested,
            replied: replied,
            not_reachable: not_reachable,
            no_response: no_response,
            follow_up: follow_up
        });
        await kpis.save();
        res.status(201).send(kpis);

    } catch (error) {
    res.status(400).send(error.message);
    }
})
app.get('/kpis', async (req, res) => {
    try {
        const kpis = await KPIs.find({}).where('client').equals(req.query.client);
        res.status(200).send(kpis);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;

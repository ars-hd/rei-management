const express = require('express');
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error.message));

const Leades = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    address: {type: String, required: true}
});

const Leads = mongoose.model('Leads', Leades);

const app = express();
app.use(express.json());

let PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("200")
});

app.post('/add', async (req, res) => {
    let { first_name, last_name, email, mobile, address } = req.query;
    try {
        const lead = new Leads({
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
});

app.get('/leads', async (req, res) => {
    try {
        const leads = await Leads.find();
        res.status(200).send(leads);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT)
module.exports = app

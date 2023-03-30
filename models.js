const monggose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

monggose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('Error connecting to MongoDB Atlas:', error.message));

const LeadSchema = new monggose.Schema({
    client: { type: String, required: true },
    campaign: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: "Warm" }
});

const ClientSchema = new monggose.Schema({
    client: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    company: { type: String, required: true },
    password: { type: String, required: true },
});

const CampaignSchema = new monggose.Schema({
    client: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: "Active" },
    prospects: { type: Number, default: 0 },
    messages: { type: Number, default: 0 },
});

const KPIsSchema = new monggose.Schema({
    client: { type: String, required: true },
    campaign: { type: String, required: true },
    date: { type: Date, default: Date.now },
    prospects: { type: Number, default: 0 },
    messages: { type: Number, default: 0 },
    replied: { type: Number, default: 0 },
    leads: { type: Number, default: 0 },
    dnc: { type: Number, default: 0 },
    not_interested: { type: Number, default: 0 },
    not_reachable: { type: Number, default: 0 },
    no_response: { type: Number, default: 0 },
    follow_up: { type: Number, default: 0 },
    type: { type: String, default: "Text" }
});

const Lead = monggose.model('Leads', LeadSchema);
const Client = monggose.model('Clients', ClientSchema);
const Campaign = monggose.model('Campaigns', CampaignSchema);
const KPIs = monggose.model('KPIs', KPIsSchema);

module.exports = {
    Lead,
    Client,
    Campaign,
    KPIs
};

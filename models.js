const monggose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

monggose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('Error connecting to MongoDB Atlas:', error.message));

const LeadSchema = new monggose.Schema({
    client: { type: String, required: true },
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
});


const Lead = monggose.model('Leads', LeadSchema);
const Client = monggose.model('Clients', ClientSchema);

module.exports = {
    Lead,
    Client
};

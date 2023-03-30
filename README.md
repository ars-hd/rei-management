### Routes

| Route | HTTP Verb | Description |
| --- | --- | --- |
| /clients | GET | Get all the clients. |
| /add_client | POST | Create a single client (client, first_name, last_name, email, mobile, company, password => {DEFAULT: P@ssword1}). |
| /leads?client=client_name | GET | Get leads by client. |
| /add_lead?client=client_name | POST | Create a lead (client, first_name, last_name, email, mobile, address) |
| /campaigns?client=client_name | GET | Get campaigns |
| /add_campaign?client=client_name | POST | Create a campaign (client, name, status, prospects, messages) |
| /kpis?client=client_name | GET | GET Kpis |
| /add_kpis?client=client_name | POST | Create KPIS (client, campaign, type, prospects, messages, leads, dnc, not_interested, replied, not_reachable, no_response, follow_up) |

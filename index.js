const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// For Meta WhatsApp webhook verification
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "my_verify_token";
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
        return res.status(200).send(challenge);
    }
    res.sendStatus(403);
});

// Receiving incoming WhatsApp messages
app.post('/webhook', (req, res) => {
    console.log('Received webhook:', JSON.stringify(req.body, null, 2));
    // Handle the WhatsApp message payload here
    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Webhook listening on port ${PORT}`);
});

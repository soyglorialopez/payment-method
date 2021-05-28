'user strict'
const fs  = require('fs')
const https = require('https');
const express = require('express');
const app = express();
const path = require('path');
const { key_secret } = require('./config.js')
const stripe = require("stripe")(key_secret);
const DOMAIN = 'https://localhost:3001/'
https.createServer({
    key: fs.readFileSync('my_cert.key'),
    cert: fs.readFileSync('my_cert.crt')
}, app).listen(3001, () => console.log(`Server listened in ${DOMAIN}`));
app.use(express.static("."));
app.use(express.json());

app.get('/li', (req, res) => {
console.log(typeof key_secret)

})
app.use('/', express.static(path.join(__dirname, '/public')))
app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'camera',
              images: ['https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'],
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${DOMAIN}success.html`,
      cancel_url: `${DOMAIN}cancel.html`,
    });
    res.json({ id: session.id });
  });

const SquareConnect = require('square-connect');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const creds = require("./square_creds.json");
const crypto = require('crypto');
var checkout = new SquareConnect.CheckoutApi();

function startServer(){
    const defaultClient = SquareConnect.ApiClient.instance;
    oauth2 = defaultClient.authentications.oauth2;
    oauth2.accessToken = creds['sandbox-token'];

    app.listen(port, () => {
        console.log(`Up and running on port ${port}!`);
    })
}
startServer();

app.get('/', (req, res) => {
    res.send("Hello world!");
})

app.get('/test', (req, res) => {
    var body = new SquareConnect.CreateCheckoutRequest();
    body.idempotency_key = crypto.randomBytes(20).toString('hex');
    body.order = new SquareConnect.CreateOrderRequest();
    body.order.idempotency_key = crypto.randomBytes(20).toString('hex');
    body.order.line_items = [];
    body.order.line_items.push();
    var lineItem = new SquareConnect.CreateOrderRequestLineItem();
    lineItem.quantity = "1";
    lineItem.base_price_money = {
        amount: 10000, //ten dollars
        currency: 'USD'
    };
    lineItem.name = "Parrots";
    body.order.line_items.push(lineItem);
    body.order.taxes = [];
    var tax = new SquareConnect.CreateOrderRequestTax();
    tax.name = "Sales Tax?";
    tax.percentage = "7";
    body.order.taxes.push(tax);

    //body.order.reference_id <- for db stuff
    body.ask_for_shipping_address = true;
    //body.redirect_url <- Set this for validation

    checkout.createCheckout(creds["sandbox-location"], body)
    .then(data => {
        console.log(data.checkout.exports.checkout_page_url);
        res.send(data.checkout.exports.checkout_page_url);
    })
    .catch(err => {
        console.log(err);
        res.send(body);
    })
})
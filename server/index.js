const SquareConnect = require('square-connect');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const creds = require("./square_creds.json");
const crypto = require('crypto');
var checkout = new SquareConnect.CheckoutApi();
let cors = require('cors');

function startServer(){
    const defaultClient = SquareConnect.ApiClient.instance;
    oauth2 = defaultClient.authentications.oauth2;
    oauth2.accessToken = creds['sandbox-token'];

    app.listen(port, () => {
        console.log(`Up and running on port ${port}!`);
    })
}
app.use(cors()); // TODO change this to the specific domain before production
startServer();

app.get('/', (req, res) => {
    res.send("Hello world!");
})

//quantity: string number
//cost: number of cents
//product_name: string



app.post('/buy', (req, res) => {
    console.log(req.body);
    var body = new SquareConnect.CreateCheckoutRequest();
    body.idempotency_key = crypto.randomBytes(20).toString('hex');
    body.order = new SquareConnect.CreateOrderRequest();
    body.order.idempotency_key = crypto.randomBytes(20).toString('hex');
    body.order.line_items = [];
    body.order.line_items.push();
    var lineItem = new SquareConnect.CreateOrderRequestLineItem();
    lineItem.quantity = req.body.quantity;
    lineItem.base_price_money = {
        amount: req.body.cost, //in cents
        currency: 'USD'
    };
    lineItem.name = req.body.product_name;
    body.order.line_items.push(lineItem);
    body.order.taxes = [];
    var tax = new SquareConnect.CreateOrderRequestTax();
    tax.name = "Sales Tax";
    tax.percentage = "7";
    body.order.taxes.push(tax);

    //body.order.reference_id <- for db stuff
    body.ask_for_shipping_address = true;
    body.redirect_url = "shop317company.com";

    checkout.createCheckout(creds["sandbox-location"], body)
    .then(data => {
        res.send(creds["validity-string"] + data.checkout.checkout_page_url);
    })
    .catch(err => {
        console.log(err);
        res.send(body);
    })
})
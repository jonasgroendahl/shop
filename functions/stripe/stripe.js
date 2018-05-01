const stripe = require("stripe")(process.env.stripeKey);
const cors = require("cors");

exports.handler = function(event, context, callback) {
  if (event.httpMethod != "OPTIONS") {
    const id = JSON.parse(event.body).id;
    console.log("CRAZY DAISY", id);
    stripe.charges.create({
      amount: 999,
      currency: "usd",
      description: "Example charge",
      source: id
    });
  }
  callback(null, {
    statusCode: 200,
    body: "We did it reddit",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "http://localhost:8888",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Headers": "X-Requested-With,content-type"
    }
  });
};

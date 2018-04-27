const stripe = require("stripe")(process.env.stripeKey);
const cors = require("cors");

exports.handler = function(event, context, callback) {
  console.log("event.body", event);
  const id = JSON.parse(event.body).id;
  console.log(id);
  stripe.charges.create({
    amount: 999,
    currency: "usd",
    description: "Example charge",
    source: id
  });
  callback(null, {
    statusCode: 200,
    body: "We did it reddit"
  });
};

const stripe = require("stripe")("sk_test_9Zs7zncExombNFm8lIuHJrBI");
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

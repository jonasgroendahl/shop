const stripe = require("stripe")(process.env.stripeKey);

exports.handler = function(event, context, callback) {
  const id = JSON.parse(event.body).id;
  const charge = stripe.charges.create({
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

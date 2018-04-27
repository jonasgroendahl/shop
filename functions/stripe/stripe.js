const stripe = require("stripe")(process.env.stripeKey);

exports.handler = function(event, context, callback) {
  console.log(event);
  console.log(event.body);
  stripe.charges.create({
    amount: 999,
    currency: "usd",
    description: "Example charge",
    source: event.body.id
  });

  callback(null, {
    statusCode: 200,
    body: "We did it reddit"
  });
};

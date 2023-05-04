const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.Payment = async(req, res , next)=>
{

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1N3FnbLV9R6YV6E1VWqGDkkZ',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url:"http://localhost:3000/payment_success",
    cancel_url:"http://localhost:3000/payment_cancel",
  });

 res.send({
    url:session.url
 })
  
}

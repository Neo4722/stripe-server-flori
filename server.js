const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "ron",
      automatic_payment_methods: { enabled: true },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    console.error("Stripe error:", e);
    res.status(500).send({ error: e.message });
  }
});

app.get("/", (req, res) => res.send("🛠️ Server funcționează!"));
app.listen(10000, () => console.log("Server pornește pe port 10000"));

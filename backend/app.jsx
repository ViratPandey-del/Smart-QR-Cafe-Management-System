const express = require("express");
const router = express.Router();

let orders = [];

router.post("/", (req, res) => {
  orders.push(req.body);

  res.json({
    success: true,
    message: "Order Received",
  });
});

router.get("/", (req, res) => {
  res.json(orders);
});

module.exports = router;
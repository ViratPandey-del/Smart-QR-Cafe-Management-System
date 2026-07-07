const express = require("express");
const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

router.post("/place-order", async (req, res) => {
  try {
    const { customerName, email, tableNo, items, totalAmount } = req.body;

    const order = new Order({
      customerName,
      email,
      tableNo,
      items,
      totalAmount,
    });

    await order.save();

    const itemRows = items
      .map(
        (item) => `
          <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price}</td>
            <td>₹${item.price * item.quantity}</td>
          </tr>
        `
      )
      .join("");

    await sendEmail(
      email,
      "Your Cafe Order Invoice",
      `
      <h2>Thank you, ${customerName}!</h2>
      <p>Your order has been placed successfully.</p>

      <p><b>Table No:</b> ${tableNo}</p>

      <table border="1" cellpadding="8" cellspacing="0">
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
        ${itemRows}
      </table>

      <h3>Total Amount: ₹${totalAmount}</h3>

      <p>Thank you for visiting our cafe.</p>
      `
    );

    res.status(201).json({
      message: "Order placed and invoice sent successfully",
      order,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
        message: err.message,
        error: err,
    });
}
});

module.exports = router;
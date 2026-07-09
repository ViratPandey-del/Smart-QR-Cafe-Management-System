const express = require("express");
const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

router.post("/place-order", async (req, res) => {
  try {
    const {
      customerName,
      email,
      tableNo,
      items,
      totalAmount,
      paymentMethod,
    } = req.body;

    const order = new Order({
      customerName,
      email,
      tableNo,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus: "pending",
      orderStatus: "placed",
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
      "Your Cafe Order Bill",
      `
      <h2>Thank you, ${customerName}!</h2>
      <p>Your order has been placed successfully.</p>
      <p><b>Payment Status:</b> Pending</p>
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
      <p>Please complete your payment to confirm it as paid.</p>
      `
    );

    res.status(201).json({
      message: "Order placed. Bill sent to email. Payment is pending.",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: "Order failed",
      error: err.message,
    });
  }
});

router.put("/pay/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.paymentStatus = "paid";
    order.paidAt = new Date();

    await order.save();

    await sendEmail(
      order.email,
      "Payment Successful",
      `
      <h2>Payment Successful</h2>
      <p>Hello ${order.customerName}, your payment has been received.</p>
      <p><b>Order ID:</b> ${order._id}</p>
      <p><b>Total Paid:</b> ₹${order.totalAmount}</p>
      <p><b>Payment Status:</b> Paid</p>
      <p>Thank you for ordering from our cafe.</p>
      `
    );

    res.json({
      message: "Payment successful. Confirmation email sent.",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: "Payment failed",
      error: err.message,
    });
  }
});

module.exports = router;
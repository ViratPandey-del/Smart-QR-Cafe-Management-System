const express = require("express");
const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| GET ALL ORDERS
|--------------------------------------------------------------------------
| Method: GET
| URL: /api/orders
| Purpose: Fetch all orders for the admin dashboard
*/
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get all orders error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch orders",
      error: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| PLACE A NEW ORDER
|--------------------------------------------------------------------------
| Method: POST
| URL: /api/orders/place-order
| Purpose:
| 1. Save the order in MongoDB
| 2. Set payment status to pending
| 3. Send the first bill email
*/
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

    if (!customerName || !email) {
      return res.status(400).json({
        success: false,
        message: "Customer name and email are required",
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one item is required",
      });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "A valid total amount is required",
      });
    }

    const order = new Order({
      customerName,
      email,
      tableNo: tableNo || "Online Order",
      items,
      totalAmount,
      paymentMethod: paymentMethod || "Cash",
      paymentStatus: "pending",
      orderStatus: "placed",
    });

    await order.save();

    const itemRows = items
      .map(
        (item) => `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">
              ${item.name}
            </td>

            <td style="padding: 8px; border: 1px solid #ddd;">
              ${item.quantity}
            </td>

            <td style="padding: 8px; border: 1px solid #ddd;">
              ₹${item.price}
            </td>

            <td style="padding: 8px; border: 1px solid #ddd;">
              ₹${item.price * item.quantity}
            </td>
          </tr>
        `
      )
      .join("");

    await sendEmail(
      email,
      "Your Cafe Order Bill",
      `
        <div style="font-family: Arial, sans-serif;">
          <h2>Thank you, ${customerName}!</h2>

          <p>Your order has been placed successfully.</p>

          <p>
            <strong>Order ID:</strong>
            ${order._id}
          </p>

          <p>
            <strong>Table / Order Type:</strong>
            ${order.tableNo}
          </p>

          <p>
            <strong>Payment Method:</strong>
            ${order.paymentMethod}
          </p>

          <p>
            <strong>Payment Status:</strong>
            Pending
          </p>

          <table
            style="
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            "
          >
            <thead>
              <tr>
                <th style="padding: 8px; border: 1px solid #ddd;">
                  Item
                </th>

                <th style="padding: 8px; border: 1px solid #ddd;">
                  Quantity
                </th>

                <th style="padding: 8px; border: 1px solid #ddd;">
                  Price
                </th>

                <th style="padding: 8px; border: 1px solid #ddd;">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              ${itemRows}
            </tbody>
          </table>

          <h3>Total Amount: ₹${totalAmount}</h3>

          <p>
            Your payment is currently pending. Complete the payment from the
            cart page.
          </p>
        </div>
      `
    );

    res.status(201).json({
      success: true,
      message: "Order placed and bill sent successfully",
      order,
    });
  } catch (error) {
    console.error("Place order error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to place order",
      error: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| PAY FOR AN ORDER
|--------------------------------------------------------------------------
| Method: PUT
| URL: /api/orders/pay/:id
| Purpose:
| 1. Find the order using its MongoDB ID
| 2. Change payment status to paid
| 3. Save the payment time
| 4. Send payment confirmation email
*/
router.put("/pay/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "This order has already been paid",
      });
    }

    order.paymentStatus = "paid";
    order.paidAt = new Date();

    await order.save();

    await sendEmail(
      order.email,
      "Cafe Payment Successful",
      `
        <div style="font-family: Arial, sans-serif;">
          <h2>Payment Successful</h2>

          <p>Hello ${order.customerName},</p>

          <p>Your payment has been received successfully.</p>

          <p>
            <strong>Order ID:</strong>
            ${order._id}
          </p>

          <p>
            <strong>Total Paid:</strong>
            ₹${order.totalAmount}
          </p>

          <p>
            <strong>Payment Method:</strong>
            ${order.paymentMethod}
          </p>

          <p>
            <strong>Payment Status:</strong>
            Paid
          </p>

          <p>Thank you for ordering from Burger House.</p>
        </div>
      `
    );

    res.status(200).json({
      success: true,
      message: "Payment successful and confirmation email sent",
      order,
    });
  } catch (error) {
    console.error("Payment error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Unable to complete payment",
      error: error.message,
    });
  }
});

// Update Order Status
router.put("/status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const orderStatus = req.body?.orderStatus;

    const validStatuses = [
      "placed",
      "preparing",
      "ready",
      "delivered",
      "cancelled",
    ];

    if (!orderStatus) {
      return res.status(400).json({
        success: false,
        message: "orderStatus is required in the request body",
      });
    }

    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
        validStatuses,
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    if (orderStatus === "delivered") {
      order.deliveredAt = new Date();
    } else {
      order.deliveredAt = null;
    }

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to update order status",
      error: error.message,
    });
  }
});

module.exports = router;
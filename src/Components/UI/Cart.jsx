import { useState } from "react";
import { useCart } from "./CartContext";

export const Cart = () => {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + parseInt(item.price.replace("₹", "")) * item.quantity,
    0
  );

  const handleOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is Empty");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    const orderData = {
      customerName: user.name,
      email: user.email,
      tableNo: cartItems[0]?.tableNo || "Online Order",
      items: cartItems.map((item) => ({
        name: item.name,
        price: parseInt(item.price.replace("₹", "")),
        quantity: item.quantity,
      })),
      totalAmount: totalPrice,
      paymentMethod,
    };

    try {
      setIsLoading(true);

      const res = await fetch("http://localhost:5000/api/orders/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        setCreatedOrderId(data.order._id);
        setOrderPlaced(true);
        alert("Order placed successfully. Bill sent to your email.");
      } else {
        alert(data.message || "Order failed");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayNow = async () => {
    if (!createdOrderId) {
      alert("Please place order first");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/orders/pay/${createdOrderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Payment successful. Confirmation email sent.");
        clearCart();
        setCreatedOrderId(null);
        setOrderPlaced(false);
      } else {
        alert(data.message || "Payment failed");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FFFFF2] min-h-screen py-10">
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-[90%] max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Login Required
            </h2>

            <p className="text-gray-700 mb-6">
              Please login first to place your order.
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowLoginPopup(false)}
                className="bg-gray-300 px-5 py-2 rounded-full"
              >
                Cancel
              </button>

              <button
                onClick={() => (window.location.href = "/login")}
                className="bg-red-600 text-white px-5 py-2 rounded-full"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-5">
        <h1 className="text-4xl font-bold text-[#502314] mb-8">
          🛒 Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-gray-500">
              Cart is Empty
            </h2>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md p-5 flex flex-col md:flex-row items-center justify-between"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-28 rounded-xl object-cover"
                    />

                    <div>
                      <h2 className="text-2xl font-bold">{item.name}</h2>

                      <p className="text-red-600 text-xl font-semibold mt-2">
                        {item.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-5 md:mt-0">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-10 h-10 rounded-full bg-gray-200 text-xl"
                    >
                      -
                    </button>

                    <span className="text-xl font-bold">{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-10 h-10 rounded-full bg-red-600 text-white text-xl"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-center mt-5 md:mt-0">
                    <h3 className="font-bold text-lg">
                      ₹
                      {parseInt(item.price.replace("₹", "")) * item.quantity}
                    </h3>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-3 bg-gray-800 hover:bg-black text-white px-5 py-2 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-8 mt-10">
              <h2 className="text-3xl font-bold mb-6">Order Summary</h2>

              <div className="flex justify-between text-xl mb-4">
                <span>Total Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="flex justify-between text-2xl font-bold text-red-600 border-t pt-4">
                <span>Total Price</span>
                <span>₹{totalPrice}</span>
              </div>

              {orderPlaced && (
                <div className="mt-6 bg-green-100 border border-green-400 text-green-800 p-4 rounded-xl">
                  <h3 className="font-bold text-lg">Order Placed</h3>
                  <p>Bill has been sent to your email.</p>
                  <p>Payment Status: Pending</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5 mt-8">
                <button
                  onClick={handleOrder}
                  disabled={isLoading || orderPlaced}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-4 rounded-xl text-lg font-bold"
                >
                  {isLoading ? "Processing..." : "Order Now"}
                </button>

                {orderPlaced && (
                  <button
                    onClick={handlePayNow}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 rounded-xl text-lg font-bold"
                  >
                    {isLoading ? "Processing..." : "Pay Now"}
                  </button>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold mb-3">Payment Method</h3>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="Cash"
                      checked={paymentMethod === "Cash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Cash
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="Online"
                      checked={paymentMethod === "Online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Online
                  </label>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
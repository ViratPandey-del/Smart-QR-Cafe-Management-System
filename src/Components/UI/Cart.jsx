import { useState } from "react";
import { useCart } from "./CartContext";

export const Cart = () => {
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
    } = useCart();

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + parseInt(item.price.replace("₹", "")) * item.quantity,
        0
    );

    // const order = {
    //     tableNo: cartItems[0]?.tableNo || "Unknown",
    //     items: cartItems,
    //     totalPrice,
    //     status: "Pending",
    //     orderTime: new Date(),
    // };



    // const handleOrder = () => {
    //     console.log(order);

    //     alert(
    //         `Order Placed!\n\nTable: ${order.tableNo}\nTotal: ₹${order.totalPrice}`
    //     );
    // };

    // const handleOrder = () => {
    //     const order = {
    //         id: Date.now(),
    //         tableNo: cartItems[0]?.tableNo,
    //         items: cartItems,
    //         totalPrice,
    //         paymentMethod: "Cash",
    //         status: "Pending",
    //     };

    //     const oldOrders =
    //         JSON.parse(localStorage.getItem("orders")) || [];

    //     oldOrders.push(order);

    //     localStorage.setItem(
    //         "orders",
    //         JSON.stringify(oldOrders)
    //     );

    //     alert("Order Placed Successfully");
    // };

    const handleOrder = async () => {
  if (cartItems.length === 0) {
    alert("Cart is Empty");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first");
    return;
  }

  const orderData = {
    customerName: user.name,
    email: user.email,
    tableNo: cartItems[0]?.tableNo || "5",
    items: cartItems.map((item) => ({
      name: item.name,
      price: parseInt(item.price.replace("₹", "")),
      quantity: item.quantity,
    })),
    totalAmount: totalPrice,
  };

    try {
  const res = await fetch("http://localhost:5000/api/orders/place-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Order placed successfully. Invoice sent to your email.");

    // Refresh page after successful order
    window.location.reload();

    } else {
        alert(data.message);
    }
    } catch (err) {
    console.log(err);
    alert("Something went wrong");
}
        const order = {
            id: Date.now(),
            tableNo: cartItems[0]?.tableNo || "Unknown",
            items: cartItems,
            totalPrice,
            paymentMethod, // radio button se jo select hua
            status: "Pending",
            orderTime: new Date().toLocaleString(),
        };

        const oldOrders =
            JSON.parse(localStorage.getItem("orders")) || [];

        oldOrders.push(order);

        localStorage.setItem("orders", JSON.stringify(oldOrders));

        alert("Order Placed Successfully");
    };
    
    return (
        <div className="bg-[#FFF8F2] min-h-screen py-10">
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
                                            <h2 className="text-2xl font-bold">
                                                {item.name}
                                            </h2>

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

                                        <span className="text-xl font-bold">
                                            {item.quantity}
                                        </span>

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
                                            {parseInt(item.price.replace("₹", "")) *
                                                item.quantity}
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

                        {/* Bill */}

                        <div className="bg-white shadow-lg rounded-2xl p-8 mt-10">

                            <h2 className="text-3xl font-bold mb-6">
                                Order Summary
                            </h2>

                            <div className="flex justify-between text-xl mb-4">
                                <span>Total Items</span>
                                <span>{cartItems.length}</span>
                            </div>

                            <div className="flex justify-between text-2xl font-bold text-red-600 border-t pt-4">
                                <span>Total Price</span>
                                <span>₹{totalPrice}</span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5 mt-8">

                                <button
                                    onClick={handleOrder}
                                    className="bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-lg font-bold"
                                >
                                    Order Now
                                </button>

                                <button className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-bold">
                                    Pay Now
                                </button>

                            </div>

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
                    </>
                )}
            </div>
        </div>
    );
};

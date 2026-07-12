import { useEffect, useState } from "react";

export const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/orders");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch orders");
      }

      setOrders(data.orders || []);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getTotalQuantity = (items = []) => {
    return items.reduce((total, item) => {
      return total + Number(item.quantity || 0);
    }, 0);
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Not available";
    }

    return new Date(dateValue).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getOrderStatusClasses = (status) => {
    switch (status) {
      case "placed":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "preparing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      case "ready":
        return "bg-purple-100 text-purple-700 border-purple-200";

      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";

      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPaymentStatusClasses = (status) => {
    if (status === "paid") {
      return "bg-green-100 text-green-700 border-green-200";
    }

    return "bg-orange-100 text-orange-700 border-orange-200";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F5EC] flex items-center justify-center px-5">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#DCCFB8] border-t-[#5A2D20] rounded-full animate-spin mx-auto" />

          <h2 className="text-2xl font-bold text-[#4B2418] mt-5">
            Loading orders...
          </h2>

          <p className="text-[#6D4C41] mt-2">
            Please wait while orders are fetched.
          </p>
        </div>
      </main>
    );
  };

  const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/status/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderStatus: newStatus,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    // Update UI without refreshing
setOrders((previousOrders) =>
  previousOrders.map((order) =>
    order._id === orderId
      ? {
          ...order,
          orderStatus: data.order.orderStatus,
          deliveredAt: data.order.deliveredAt,
        }
      : order
  )
);
  } catch (error) {
    console.log(error);
    alert("Unable to update order");
  }
};

const filteredOrders =
  filter === "all"
    ? orders
    : orders.filter((order) => order.orderStatus === filter);

  return (
    <main className="min-h-screen bg-[#F8F5EC] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">
          <div>
            <p className="text-sm font-bold tracking-[0.2em] uppercase text-[#8A5A44]">
              Cafe Management
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold text-[#4B2418] mt-2">
              Admin Dashboard
            </h1>

            <p className="text-[#6D4C41] mt-3">
              View and manage customer orders.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchOrders}
            className="bg-[#5A2D20] hover:bg-[#3E1E14] text-white px-6 py-3 rounded-xl font-bold transition"
          >
            Refresh Orders
          </button>
          <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setFilter("all")}>All</button>

              <button onClick={() => setFilter("placed")}>Placed</button>

              <button onClick={() => setFilter("preparing")}>Preparing</button>

              <button onClick={() => setFilter("ready")}>Ready</button>

              <button onClick={() => setFilter("delivered")}>Delivered</button>

              <button onClick={() => setFilter("cancelled")}>Cancelled</button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-5 py-4 rounded-xl mb-8">
            <h2 className="font-bold">Unable to load orders</h2>
            <p className="mt-1">{error}</p>
          </div>
        )}

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-[#FFFDF8] border border-[#DCCFB8] rounded-2xl p-6 shadow-sm">
            <p className="text-[#6D4C41]">Total Orders</p>
            <h2 className="text-4xl font-bold text-[#4B2418] mt-2">
              {orders.length}
            </h2>
          </div>

          <div className="bg-[#FFFDF8] border border-[#DCCFB8] rounded-2xl p-6 shadow-sm">
            <p className="text-[#6D4C41]">Placed</p>
            <h2 className="text-4xl font-bold text-blue-700 mt-2">
              {
                orders.filter((order) => order.orderStatus === "placed")
                  .length
              }
            </h2>
          </div>

          <div className="bg-[#FFFDF8] border border-[#DCCFB8] rounded-2xl p-6 shadow-sm">
            <p className="text-[#6D4C41]">Preparing</p>
            <h2 className="text-4xl font-bold text-yellow-700 mt-2">
              {
                orders.filter((order) => order.orderStatus === "preparing")
                  .length
              }
            </h2>
          </div>

          <div className="bg-[#FFFDF8] border border-[#DCCFB8] rounded-2xl p-6 shadow-sm">
            <p className="text-[#6D4C41]">Paid Orders</p>
            <h2 className="text-4xl font-bold text-green-700 mt-2">
              {
                orders.filter((order) => order.paymentStatus === "paid")
                  .length
              }
            </h2>
          </div>
        </section>

        {orders.length === 0 ? (
          <section className="bg-[#FFFDF8] border border-[#DCCFB8] rounded-3xl p-12 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-[#4B2418]">
              No orders found
            </h2>

            <p className="text-[#6D4C41] mt-3">
              New customer orders will appear here.
            </p>
          </section>
        ) : (
          <section className="grid lg:grid-cols-2 gap-6">
            {filteredOrders.map((order) => (
              <article
                key={order._id}
                className="bg-[#FFFDF8] border border-[#DCCFB8] rounded-3xl p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-[#8A5A44] font-semibold">
                      Order ID
                    </p>

                    <p className="text-sm text-[#6D4C41] break-all mt-1">
                      {order._id}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={`status-${order._id}`}
                        className="text-xs font-bold uppercase tracking-wide text-[#8A5A44]"
                      >
                        Order Status
                      </label>

                      <select
                        id={`status-${order._id}`}
                        value={order.orderStatus || "placed"}
                        onChange={(e) =>
                          updateOrderStatus(order._id, e.target.value)
                        }
                        className={`border px-3 py-2 rounded-xl font-bold capitalize cursor-pointer outline-none ${getOrderStatusClasses(
                          order.orderStatus
                        )}`}
                      >
                        <option value="placed">Placed</option>

                        <option value="preparing">Preparing</option>

                        <option value="ready">Ready</option>

                        <option value="delivered">Delivered</option>

                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <span
                      className={`border px-3 py-1 rounded-full text-sm font-bold capitalize ${getPaymentStatusClasses(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus || "pending"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#DCCFB8] mt-5 pt-5 grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#8A5A44] font-semibold">
                      Customer
                    </p>

                    <h2 className="text-xl font-bold text-[#4B2418] mt-1">
                      {order.customerName || "Unknown Customer"}
                    </h2>

                    <p className="text-[#6D4C41] mt-1 break-all">
                      {order.email || "No email"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[#8A5A44] font-semibold">
                      Table / Order Type
                    </p>

                    <h2 className="text-xl font-bold text-[#4B2418] mt-1">
                      {order.tableNo || "Online Order"}
                    </h2>

                    <p className="text-[#6D4C41] mt-1">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#DCCFB8] mt-5 pt-5">
                  <div className="flex justify-between gap-4 mb-4">
                    <h3 className="text-lg font-bold text-[#4B2418]">
                      Ordered Items
                    </h3>

                    <span className="text-[#6D4C41] font-semibold">
                      {getTotalQuantity(order.items)} item(s)
                    </span>
                  </div>

                  <div className="space-y-3">
                    {(order.items || []).map((item, index) => (
                      <div
                        key={`${order._id}-${item._id || index}`}
                        className="flex justify-between gap-5 bg-[#F8F5EC] border border-[#E7DCC9] rounded-xl p-4"
                      >
                        <div>
                          <h4 className="font-bold text-[#4B2418]">
                            {item.name}
                          </h4>

                          <p className="text-sm text-[#6D4C41] mt-1">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>

                        <p className="font-bold text-[#5A2D20]">
                          ₹{Number(item.price) * Number(item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#DCCFB8] mt-5 pt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                  <div>
                    <p className="text-sm text-[#8A5A44] font-semibold">
                      Payment Method
                    </p>

                    <p className="font-bold text-[#4B2418] mt-1">
                      {order.paymentMethod || "Cash"}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-sm text-[#8A5A44] font-semibold">
                      Total Amount
                    </p>

                    <p className="text-3xl font-bold text-[#5A2D20] mt-1">
                      ₹{order.totalAmount || 0}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};
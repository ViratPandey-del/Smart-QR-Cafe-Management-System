import { useEffect, useState } from "react";

export const Admin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(data);
  }, []);
const handleDone = (id) => {
  const updatedOrders = orders.filter((order) => order.id !== id);

  setOrders(updatedOrders);

  localStorage.setItem("orders", JSON.stringify(updatedOrders));
};
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        Burger House Admin Panel
      </h1>

      {orders.length === 0 ? (
        <h2 className="text-center text-2xl">
          No Orders
        </h2>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="flex justify-between">

              <h2 className="text-2xl font-bold text-red-600">
                Table : {order.tableNo}
              </h2>

              <span className="bg-yellow-400 px-4 py-2 rounded-full">
                {order.status}
              </span>

            </div>

            <p className="mt-2">
              Payment : <b>{order.paymentMethod}</b>
            </p>

            <p>
              Time : {order.orderTime}
            </p>

            <hr className="my-4" />

            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b py-2"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  ₹
                  {parseInt(item.price.replace("₹", "")) *
                    item.quantity}
                </span>
                
              </div>
            ))}

            <h2 className="text-right text-2xl font-bold mt-5">
              Total : ₹{order.totalPrice}
            </h2>
            <div className="flex justify-end mt-5">
  <button
    onClick={() => handleDone(order.id)}
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
  >
    ✅ Done
  </button>
</div>

          </div>
          
        ))
      )}
      
    </div>
    
  );
};
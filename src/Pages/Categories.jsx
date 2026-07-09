import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCart } from "../Components/UI/CartContext";

const menuItems = [
  {
    id: 1,
    name: "Chicken Burger",
    price: "₹199",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
  },
  {
    id: 2,
    name: "Veg Burger",
    price: "₹149",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600",
  },
  {
    id: 3,
    name: "French Fries",
    price: "₹99",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600",
  },
  {
    id: 4,
    name: "Cold Drink",
    price: "₹79",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600",
  },
  {
    id: 5,
    name: "Chicken Wrap",
    price: "₹229",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600",
  },
  {
    id: 6,
    name: "Pizza Burger",
    price: "₹249",
    image: "https://images.unsplash.com/photo-1550317138-10000687a72b?w=600",
  },
  {
    id: 7,
    name: "Sandwich",
    price: "₹149",
    image: "https://somethingaboutsandwiches.com/wp-content/uploads/2022/04/ham-sandwich.jpg",
  },
  {
    id: 8,
    name: "Icecream Sundae",
    price: "₹199",
    image: "https://tse4.mm.bing.net/th/id/OIP.wBzIPzUzgqHyObL3sg3feAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
];

export const Categories = () => {
  const [search, setSearch] = useState("");
  const [showTablePopup, setShowTablePopup] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tableNo = searchParams.get("table");

  const { addToCart, removeFromCart } = useCart();

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section className="bg-[#FFF8F2] py-16">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold text-[#502314]">
              Our Menu
            </h2>
            <p className="text-gray-600 mt-3">
              Freshly made with premium ingredients
            </p>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-red-600">
              Table No : {tableNo || "Not Selected"}
            </h3>
          </div>

          <div className="max-w-md mx-auto mt-8 mb-10">
            <input
              type="text"
              placeholder="🔍 Search Burger, Fries, Pizza..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 border-2 border-red-500 rounded-full outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <h2 className="text-2xl font-semibold text-gray-500">
                  😔 No food found
                </h2>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-60 object-cover hover:scale-110 transition duration-500"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-2xl font-bold text-[#502314]">
                      {item.name}
                    </h3>

                    <p className="text-orange-600 font-bold text-xl mt-2">
                      {item.price}
                    </p>

                    <div className="flex gap-3 mt-5">
                      <button
                        onClick={() => {
                          if (!tableNo) {
                            setShowTablePopup(true);
                            return;
                          }

                          addToCart({
                            ...item,
                            tableNo,
                          });
                        }}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold transition"
                      >
                        Add to Cart
                      </button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex-1 bg-gray-700 hover:bg-black text-white py-3 rounded-full font-semibold transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {showTablePopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-5">
              <span className="text-6xl">📱</span>
            </div>

            <h2 className="text-3xl font-bold text-[#502314]">
              Scan QR Code
            </h2>

            <p className="text-gray-600 mt-3 leading-7">
              Please scan the QR code placed on your table before adding items
              to cart.
            </p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowTablePopup(false)}
                className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={() => navigate("/qr")}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition font-semibold"
              >
                Scan QR
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
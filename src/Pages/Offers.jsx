import { FaTag, FaGift, FaPercent } from "react-icons/fa";

const offers = [
  {
    id: 1,
    title: "Buy 1 Get 1 Free",
    description: "Order any Classic Burger and get another absolutely FREE.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    badge: "BOGO",
  },
  {
    id: 2,
    title: "Family Combo",
    description: "2 Burgers + 2 Fries + 2 Drinks only for ₹499.",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
    badge: "SAVE ₹200",
  },
  {
    id: 3,
    title: "Weekend Special",
    description: "Flat 30% OFF on all Premium Burgers every weekend.",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800",
    badge: "30% OFF",
  },
];

export const Offers = () => {
  return (
    <div className="bg-[#FFF8F2]">

      {/* Hero */}
      <section className="bg-[#502314] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Hot Offers 🔥</h1>
          <p className="text-lg text-gray-200">
            Grab your favorite burgers at amazing prices.
          </p>
        </div>
      </section>

      {/* Offers */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-64 object-cover"
                />

                <span className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-semibold">
                  {offer.badge}
                </span>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#502314] mb-3">
                  {offer.title}
                </h2>

                <p className="text-gray-600 mb-6">
                  {offer.description}
                </p>

                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold transition">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-8">

          <div>
            <h2 className="text-4xl font-bold mb-4">
              Get 20% OFF on Your First Order
            </h2>
            <p className="text-lg">
              Use coupon code <span className="font-bold">WELCOME20</span> at
              checkout and enjoy delicious savings.
            </p>
          </div>

          <button className="bg-white text-red-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition">
            Claim Offer
          </button>

        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-[#502314] mb-12">
            Why Our Offers?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="text-center bg-[#FFF8F2] rounded-3xl p-8 shadow">
              <FaTag className="text-5xl text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Exclusive Deals</h3>
              <p className="text-gray-600">
                Daily and weekly offers on your favorite burgers.
              </p>
            </div>

            <div className="text-center bg-[#FFF8F2] rounded-3xl p-8 shadow">
              <FaGift className="text-5xl text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Special Combos</h3>
              <p className="text-gray-600">
                Save more with exciting family and party combos.
              </p>
            </div>

            <div className="text-center bg-[#FFF8F2] rounded-3xl p-8 shadow">
              <FaPercent className="text-5xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Best Discounts</h3>
              <p className="text-gray-600">
                Enjoy discounts up to 50% on selected menu items.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};


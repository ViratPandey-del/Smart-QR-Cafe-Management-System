import {
  FaHamburger,
  FaUtensils,
  FaSmile,
  FaLeaf,
} from "react-icons/fa";

export const About = () => {
  return (
    <div className="bg-[#FFF8F2]">

      {/* Hero Section */}
      <section className="bg-[#502314] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About Burger House Cafe
          </h1>

          <p className="text-sm sm:text-lg max-w-3xl mx-auto text-gray-200 leading-7">
            Serving delicious burgers, crispy fries, refreshing beverages,
            and unforgettable dining experiences with passion and quality.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          <div>
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"
              alt="Burger House"
              className="rounded-2xl shadow-xl w-full h-[250px] sm:h-[450px] object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#502314] mb-5">
              Our Story
            </h2>

            <p className="text-gray-600 leading-7 sm:leading-8 mb-4 text-sm sm:text-base">
              Burger House Cafe was founded with one simple mission—to serve
              freshly prepared burgers made with premium ingredients and lots
              of love.
            </p>

            <p className="text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base">
              Whether you're visiting with family, friends, or ordering your
              favorite burger online, we strive to provide exceptional food.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-[#502314] mb-12">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-[#FFF8F2] p-6 rounded-2xl text-center shadow hover:shadow-lg transition">
              <FaHamburger className="text-4xl sm:text-5xl text-red-600 mx-auto mb-4" />

              <h3 className="text-lg sm:text-xl font-bold mb-2">
                Fresh Burgers
              </h3>

              <p className="text-gray-600 text-sm sm:text-base">
                Made fresh every day using premium ingredients.
              </p>
            </div>

            <div className="bg-[#FFF8F2] p-8 rounded-2xl text-center shadow hover:shadow-lg transition">
              <FaLeaf className="text-5xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Quality Ingredients</h3>
              <p className="text-gray-600">
                We use only fresh vegetables and high-quality ingredients.
              </p>
            </div>

            <div className="bg-[#FFF8F2] p-8 rounded-2xl text-center shadow hover:shadow-lg transition">
              <FaUtensils className="text-5xl text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Fast Service</h3>
              <p className="text-gray-600">
                Enjoy quick service without compromising on quality.
              </p>
            </div>

            <div className="bg-[#FFF8F2] p-8 rounded-2xl text-center shadow hover:shadow-lg transition">
              <FaSmile className="text-5xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Happy Customers</h3>
              <p className="text-gray-600">
                Thousands of customers trust us for delicious food.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#502314] text-white py-12 sm:py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">

      <div>
        <h3 className="text-3xl sm:text-5xl font-bold">10+</h3>
        <p className="mt-2 text-sm sm:text-base">Years Experience</p>
      </div>

      <div>
        <h3 className="text-3xl sm:text-5xl font-bold">25K+</h3>
        <p className="mt-2 text-sm sm:text-base">Happy Customers</p>
      </div>

      <div>
        <h3 className="text-3xl sm:text-5xl font-bold">50+</h3>
        <p className="mt-2 text-sm sm:text-base">Food Items</p>
      </div>

      <div>
        <h3 className="text-3xl sm:text-5xl font-bold">100%</h3>
        <p className="mt-2 text-sm sm:text-base">Fresh Quality</p>
      </div>

    </div>
  </div>
</section>

    </div>
  );
};


import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-[#502314] text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-orange-400 mb-4">
              🍔 Burger House
            </h2>

            <p className="text-gray-300 leading-7">
              Enjoy freshly prepared burgers, crispy fries, delicious pizzas,
              refreshing beverages, and unforgettable dining experiences.
            </p>

            <div className="flex gap-4 mt-6">

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white text-[#502314] flex items-center justify-center hover:bg-orange-500 hover:text-white transition"
              >
                <FaFacebookF />
              </a>

              <a
                target="_blank"
                href="https://www.instagram.com/burger_house025/"
                className="w-10 h-10 rounded-full bg-white text-[#502314] flex items-center justify-center hover:bg-orange-500 hover:text-white transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white text-[#502314] flex items-center justify-center hover:bg-orange-500 hover:text-white transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white text-[#502314] flex items-center justify-center hover:bg-orange-500 hover:text-white transition"
              >
                <FaYoutube />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-5 text-orange-400">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="/" className="hover:text-orange-400 transition">
                  Home
                </a>
              </li>

              <li>
                <a href="/menu" className="hover:text-orange-400 transition">
                  Menu
                </a>
              </li>

              <li>
                <a href="/offers" className="hover:text-orange-400 transition">
                  Offers
                </a>
              </li>

              <li>
                <a href="/about" className="hover:text-orange-400 transition">
                  About Us
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-orange-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-2xl font-semibold mb-5 text-orange-400">
              Opening Hours
            </h3>

            <div className="space-y-3 text-gray-300">
              <p>Monday - Friday</p>
              <p>10:00 AM - 10:00 PM</p>

              <p className="pt-2">Saturday - Sunday</p>
              <p>10:00 AM - 11:00 PM</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-semibold mb-5 text-orange-400">
              Contact
            </h3>

            <div className="space-y-5 text-gray-300">

              <div className="flex gap-3">
                <FaMapMarkerAlt className="text-orange-400 mt-1" />
                <p>
                  123 Main Street,<br />
                  New Delhi, India
                </p>
              </div>

              <div className="flex gap-3">
                <FaPhoneAlt className="text-orange-400 mt-1" />
                <p>+91 98765 43210</p>
              </div>

              <div className="flex gap-3">
                <FaEnvelope className="text-orange-400 mt-1" />
                <p>info@burgerhouse.com</p>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Burger House Cafe. All Rights Reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0 text-sm">
            <a href="#" className="hover:text-orange-400">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-orange-400">
              Terms & Conditions
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};


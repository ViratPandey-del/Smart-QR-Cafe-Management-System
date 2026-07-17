import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

export const Contact = () => {
  return (
    <div className="bg-[#FFF8F2]">

      {/* Hero */}
      <section className="bg-[#502314] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-200">
            We'd love to hear from you. Get in touch with Burger House Cafe.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div>

            <h2 className="text-3xl font-bold text-[#502314] mb-8">
              Get In Touch
            </h2>

            <div className="space-y-6">

              <div className="flex items-start gap-4">
                <div className="bg-red-600 text-white p-4 rounded-full">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Address</h3>
                  <p className="text-gray-600">
                    Bareilly, Uttar Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-600 text-white p-4 rounded-full">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Phone</h3>
                  <p className="text-gray-600">+91 98765 XXXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-600 text-white p-4 rounded-full">
                  <FaEnvelope />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-gray-600">
                    info@burgerhousecafe.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-600 text-white p-4 rounded-full">
                  <FaClock />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Opening Hours</h3>
                  <p className="text-gray-600">
                    Monday - Sunday <br />
                    10:00 AM - 11:00 PM
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-3xl font-bold text-[#502314] mb-6">
              Send a Message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>
      </section>

      {/* Google Map */}
      <section className="pb-16 px-6">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-lg">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d876.7716686325053!2d79.43562546959473!3d28.476936277327912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0093f19e7efb7%3A0xea5c3b8d960bc2cb!2sShri%20Ram%20Murti%20Smarak%20College%20of%20Engineering%20%26%20Technology%2C%20Bareilly%20(SRMS%20CET)!5e0!3m2!1sen!2sin!4v1783170568899!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </section>

    </div>
  );
};


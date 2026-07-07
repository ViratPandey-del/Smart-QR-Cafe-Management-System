// import { useEffect, useState } from "react";
// import { Categories } from "./Categories";

// export const Home = () => {
//   const slides = [

//     {
//       src: "https://player.vimeo.com/video/1191610113?title=0&byline=0&portrait=0&color=3a6774&autoplay=1&loop=1&background=1"
//     }
//   ];

//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <>
//       <div className="relative w-full h-[400px] overflow-hidden bg-white">
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 ${
//               current === index ? "block" : "hidden"
//             }`}
//           >
//             <img
//               src={slide.src}
//               alt={`Slide ${index + 1}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}

//         {/* Dots */}
//         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrent(index)}
//               className={`h-3 rounded-full transition-all duration-300 ${
//                 current === index
//                   ? "w-8 bg-orange-500"
//                   : "w-3 bg-gray-400"
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       <Categories/>
//     </>
//   );
// };


import { Categories } from "./Categories";
import { About } from "./About";
import { Offers } from "./Offers";
import { Contact } from "./Contact";

export const Home = () => {
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <iframe
          src="https://player.vimeo.com/video/1191610113?autoplay=1&loop=1&background=1&muted=1&title=0&byline=0&portrait=0"
          className="
      absolute
      top-1/2 left-1/2
      w-[177.78vh] h-[56.25vw]
      min-w-full min-h-full
      -translate-x-1/2 -translate-y-1/2
      pointer-events-none
    "
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold">
            Bakery & Cafe in Bareilly
          </h1>

          <p className="mt-4 text-white text-base sm:text-lg md:text-xl max-w-2xl">
            Handcrafted cakes, pastries, and everyday cafe fare on State Street.
          </p>

          <a href="/categories">
            <button className="mt-6 px-8 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition">
              Order Now
            </button>
          </a>
        </div>
      </div>


      <About />
      <Categories />
      <Offers />
      <Contact />
      </>
  );
};
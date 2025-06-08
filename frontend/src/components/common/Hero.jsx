import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";

const slides = [
  {
    heading: "Smart Metro Travel",
    subheading: "Experience seamless travel with our state-of-the-art metro system.",
    cta: "Book Now",
  },
  {
    heading: "24/7 Service",
    subheading: "Round-the-clock metro services ensuring you reach your destination anytime.",
    cta: "View Schedule",
  },
  {
    heading: "Safe & Reliable",
    subheading: "Your safety is our priority with advanced security systems.",
    cta: "Learn More",
  },
];

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    className: "w-full",
  };

  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-black via-[#1c1c1c] to-[#2f2f2f] text-white overflow-hidden">
      
      {/* Metro Outline Image */}
      <img
        src="/assets/metro-outline.svg"
        alt="Metro Outline"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-10 w-[80%] z-0"
      />

      {/* Animated Metro Line */}
      <svg
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        width="500"
        height="60"
        viewBox="0 0 500 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="30"
          x2="500"
          y2="30"
          stroke="#00e0ff"
          strokeWidth="4"
          strokeDasharray="5 10"
        />
        {[50, 150, 250, 350, 450].map((cx, i) => (
          <circle
            key={i}
            cx={cx}
            cy={30}
            r={8}
            fill="#00e0ff"
            className="animate-pulse"
          />
        ))}
      </svg>

      <div className="relative z-20 h-full flex items-center justify-center max-w-7xl mx-auto px-6">
        <div className="w-full">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center gap-6"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#00e0ff] to-[#0066ff] bg-clip-text text-transparent">
                  {slide.heading}
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                  {slide.subheading}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#00e0ff] to-[#0066ff] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#00e0ff]/20 transition-all duration-300"
                >
                  {slide.cta}
                </motion.button>
              </motion.div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Hero;

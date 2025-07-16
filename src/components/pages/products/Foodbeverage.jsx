import React, { useState, useRef, useEffect } from 'react';
import b1 from '../../../assets/b1.jpg';
import b2 from '../../../assets/b2.jpg';
import b3 from '../../../assets/b3.jpg';
import b4 from '../../../assets/b4.jpg';
import styled from 'styled-components';

const images = [b1, b2, b3, b4];
const AUTO_SLIDE_INTERVAL = 3500;

function Foodbeverage() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoSlideRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  useEffect(() => {
    if (!paused) {
      autoSlideRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, AUTO_SLIDE_INTERVAL);
    } else {
      clearInterval(autoSlideRef.current);
    }
    return () => clearInterval(autoSlideRef.current);
  }, [paused]);

  const handleThumbClick = (idx) => {
    setCurrent(idx);
    setPaused(true);
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setPaused(false), 5000);
  };

  return (
    <div className="w-full flex flex-col items-center px-4 py-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-5xl w-full bg-white/95 rounded-3xl shadow-xl border border-blue-100 p-8 md:p-16 flex flex-col md:flex-row gap-10 items-center">
        {/* Left: Text */}
        <div className="flex-1 min-w-[260px]">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 font-sans tracking-tight">Food & Beverage Packaging Lines</h2>
          <p className="text-lg md:text-xl text-gray-800 mb-4 font-sans">ATS UK Ltd delivers high-performance packaging lines for the food and beverage industry, ensuring hygiene, speed, and flexibility for a wide range of products and container types.</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Automated filling and capping</li>
            <li>Labeling and inspection systems</li>
            <li>Flexible line configurations</li>
            <li>Compliance with food safety standards</li>
            <li>Turnkey solutions for all scales</li>
          </ul>
          <p className="text-base md:text-lg text-gray-700">Our solutions are designed for maximum uptime, easy cleaning, and rapid changeover, supporting your growth in a competitive market.</p>
        </div>
        {/* Right: Carousel */}
        <div className="flex-1 flex flex-col items-center w-full max-w-2xl">
          <div
            key={current}
            className="rounded-3xl shadow-xl overflow-hidden bg-black w-full max-w-2xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-4 hover:border-blue-400"
            style={{ aspectRatio: '16/9' }}
          >
            <img
              src={images[current]}
              alt={`Food & Beverage ${current + 1}`}
              className="w-full h-full object-cover rounded-3xl"
              draggable={false}
              style={{ userSelect: 'none' }}
            />
          </div>
          {/* Thumbnails */}
          <div className="flex flex-row gap-3 mt-6 overflow-x-auto w-full max-w-md px-2 justify-center scrollbar-hide">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => handleThumbClick(idx)}
                className={`rounded-xl overflow-hidden border-2 transition-all duration-200 ${idx === current ? 'border-blue-500 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'}`}
                style={{ width: 80, height: 80, minWidth: 80, minHeight: 80 }}
                tabIndex={0}
                aria-label={`Show image ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                  style={{ userSelect: 'none' }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Info Section */}
      <div className="max-w-4xl w-full mt-12 bg-white/90 rounded-2xl shadow-md border border-blue-100 p-8 text-center">
        <h3 className="text-2xl font-bold text-blue-800 mb-4">Why Choose ATS for Food & Beverage?</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 text-left max-w-2xl mx-auto">
          <li>Expertise in food-grade automation</li>
          <li>Custom solutions for bottles, jars, cans, and more</li>
          <li>End-to-end project management</li>
          <li>Ongoing support and maintenance</li>
        </ul>
        <p className="text-base md:text-lg text-gray-700">Contact us to discuss your food & beverage packaging needs and see how ATS can help you achieve operational excellence.</p>
      </div>
    </div>
  );
}

export default Foodbeverage;

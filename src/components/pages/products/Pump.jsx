import React, { useState } from "react";
import p1 from '../../../assets/p1 1.jpg';
import p2 from '../../../assets/p2 1.jpg';
import p3 from '../../../assets/p3 1.jpg';
import p4 from '../../../assets/p4 1.jpg';
import p5 from '../../../assets/p5 1.jpg';
import p6 from '../../../assets/p6 1.jpg';
import p7 from '../../../assets/p7 1.jpg';
import p8 from '../../../assets/p8 1.jpg';

const pumpImages = [p1, p2, p3, p4, p5, p6, p7, p8];

function Pump() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const total = pumpImages.length;

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };
  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">Pump & Trigger Feeding Systems</h1>
      <p className="text-lg text-gray-700 mb-8">
        ATS offers advanced pump and trigger feeding systems designed for efficiency, reliability, and seamless integration into your packaging lines. Our solutions are tailored for a wide range of applications and industries.
      </p>
      <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-blue-100 text-blue-700 rounded-full p-2 shadow-md focus:outline-none"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div className="relative h-80 w-full">
          {pumpImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Pump system ${idx + 1}`}
              className={`absolute top-0 left-0 w-full h-80 object-cover object-center rounded-xl shadow-lg transition-all duration-700 ease-in-out
                ${idx === current ? 'opacity-100 z-20 translate-x-0 scale-100' : 'opacity-0 z-10 scale-95'}
                ${idx !== current && direction === 1 ? '-translate-x-10' : ''}
                ${idx !== current && direction === -1 ? 'translate-x-10' : ''}
              `}
              style={{ pointerEvents: idx === current ? 'auto' : 'none' }}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-blue-100 text-blue-700 rounded-full p-2 shadow-md focus:outline-none"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {pumpImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setDirection(idx > current ? 1 : -1); setCurrent(idx); }}
              className={`w-3 h-3 rounded-full ${current === idx ? 'bg-blue-700' : 'bg-gray-300'} transition-colors`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      {/* Animation styles */}
      <style>{`
        .carousel-img {
          transition: opacity 0.7s, transform 0.7s;
        }
      `}</style>
    </div>
  );
}

export default Pump;
   
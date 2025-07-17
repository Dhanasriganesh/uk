import React, { useState, useRef, useEffect } from 'react';
import food1 from '../../../assets/food1.png';
import food2 from '../../../assets/food2.png';
import food3 from '../../../assets/food3.png';
import food4 from '../../../assets/food4.png';
import food5 from '../../../assets/food5.png';
import food6 from '../../../assets/food6.png';
import food7 from '../../../assets/food7.png';
import food8 from '../../../assets/food8.png';
import food9 from '../../../assets/food9.png';
import food10 from '../../../assets/food10.png';
import { FaFilePdf } from 'react-icons/fa';

const images = [food1, food2, food3, food4, food5, food6, food7, food8, food9, food10];
const AUTO_SLIDE_INTERVAL = 3500;

function Foodbeverage() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoSlideRef = useRef(null);
  const thumbContainerRef = useRef(null);
  const thumbRefs = useRef([]);

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

  useEffect(() => {
    if (thumbContainerRef.current && thumbRefs.current[current]) {
      const container = thumbContainerRef.current;
      const activeThumb = thumbRefs.current[current];
      const containerRect = container.getBoundingClientRect();
      const thumbRect = activeThumb.getBoundingClientRect();
      const offset = thumbRect.left - containerRect.left - (containerRect.width / 2) + (thumbRect.width / 2);
      container.scrollTo({ left: container.scrollLeft + offset, behavior: 'smooth' });
    }
  }, [current]);

  const handleThumbClick = (idx) => {
    setCurrent(idx);
    setPaused(true);
    setTimeout(() => setPaused(false), 4000);
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-2 sm:px-6 py-6 sm:py-14 flex flex-col md:flex-row items-center gap-6 md:gap-14">
        {/* Left: Text */}
        <div className="flex-1 max-w-xl w-full text-center md:text-left">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-3 sm:mb-4 leading-tight">Food & Beverage Lines (FBL)</h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6">Our Food & Beverage Line equipment is the most complete range of food manufacturing machinery available in the UK & Ireland from a single source supplier. This unique and comprehensive brand of machinery is designed to provide either individual or turnkey food & beverage production lines for products that need to be packed in glass jars, bottles or metal cans.</p>
        </div>
        {/* Right: Carousel */}
        <div className="flex-1 w-full max-w-xl flex flex-col items-center">
          <div className="w-full aspect-video rounded-2xl shadow-xl overflow-hidden bg-black mb-3 sm:mb-4">
            <img
              src={images[current]}
              alt={`Food & Beverage ${current + 1}`}
              className="w-full h-full object-cover select-none pointer-events-none"
              draggable={false}
            />
          </div>
          {/* Thumbnails */}
          <div
            ref={thumbContainerRef}
            className="flex flex-row gap-2 sm:gap-3 mt-1 sm:mt-2 overflow-x-auto w-full max-w-xl px-0.5 sm:px-1 justify-center scrollbar-hide"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                ref={el => thumbRefs.current[idx] = el}
                onClick={() => handleThumbClick(idx)}
                className={`rounded-lg overflow-hidden border-2 transition-all duration-200 ${idx === current ? 'border-blue-500 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'}`}
                style={{ width: 48, height: 48, minWidth: 48, minHeight: 48, '@media (min-width: 640px)': { width: 60, height: 60, minWidth: 60, minHeight: 60 } }}
                tabIndex={0}
                aria-label={`Show image ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-3 bg-blue-50 my-4 sm:my-8" />

      {/* Machine Sections */}
      <section className="max-w-6xl mx-auto px-2 sm:px-6 py-6 flex flex-col gap-6 items-center">
        <div className="bg-white/90 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center border border-blue-100 w-full max-w-2xl">
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Depalletiser</h3>
          <p className="text-xs sm:text-base text-gray-700 text-center mb-2">An automatic solution for the unpacking of jars, bottles or cans directly onto the production line.</p>
        </div>
        <div className="bg-white/90 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center border border-blue-100 w-full max-w-2xl">
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Universal Blower</h3>
          <p className="text-xs sm:text-base text-gray-700 text-center mb-2">An automatic solution for either dry or wet cleaning of glass jars and bottles.</p>
        </div>
        <div className="bg-white/90 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center border border-blue-100 w-full max-w-2xl">
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Rotary Filling Machine</h3>
          <p className="text-xs sm:text-base text-gray-700 text-center mb-2">High speed rotary filling machines using either vacuum or piston filling technology at up to speeds of 500upm and with automatic Clean-In-Place systems.</p>
        </div>
        <div className="bg-white/90 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center border border-blue-100 w-full max-w-2xl">
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Linear Filling Machine</h3>
          <p className="text-xs sm:text-base text-gray-700 text-center mb-2">Flexible piston filling machine with scroll feeding system capable of up to 100upm and with automatic Clean-In-Place systems.</p>
        </div>
        <div className="bg-white/90 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center border border-blue-100 w-full max-w-2xl">
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Twist Off Capping Machines</h3>
          <p className="text-xs sm:text-base text-gray-700 text-center mb-2">A range of automatic linear capping machines to tighten TO or PTO metallic lids under vacuum by steam injection (optional) and at up to 500upm.</p>
        </div>
        <div className="bg-white/90 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center border border-blue-100 w-full max-w-2xl">
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Pasteuriser & Cooler</h3>
          <p className="text-xs sm:text-base text-gray-700 text-center mb-2">Tunnel pasteuriser suitable for the thermic treatment of glass jars, bottles and metal cans.</p>
        </div>
        <div className="bg-white/90 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center border border-blue-100 w-full max-w-2xl">
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Vacuum Detection</h3>
          <p className="text-xs sm:text-base text-gray-700 text-center mb-2">A range of vacuum detection systems to detect that TO or PTO lids have been applied correctly.</p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-3 bg-blue-50 my-4 sm:my-8" />

      {/* CTA Section */}
      <section className="w-full flex flex-col items-center justify-center py-8 px-2 sm:px-6">
        <div className="flex flex-col gap-3 w-full max-w-xs sm:max-w-xl justify-center">
          <a
            href="/src/assets/pdf_1718978495.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-6 rounded-full bg-black text-white font-semibold text-base sm:text-lg shadow-lg hover:shadow-2xl hover:bg-blue-900 transition-all duration-300 text-center"
          >
            <FaFilePdf className="inline-block mr-2 text-lg sm:text-xl align-middle" /> Download Brochure
          </a>
          <a
            href="/contact"
            className="w-full py-3 px-6 rounded-full bg-white text-blue-700 font-semibold text-base sm:text-lg shadow-lg hover:shadow-2xl hover:bg-blue-50 border border-blue-200 transition-all duration-300 text-center"
          >
            Enquire about this Product
          </a>
        </div>
      </section>
    </div>
  );
}

export default Foodbeverage;

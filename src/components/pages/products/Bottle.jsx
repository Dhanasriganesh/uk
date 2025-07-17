import React, { useRef, useState, useEffect } from 'react';
import b1 from '../../../assets/b1.jpg';
import b2 from '../../../assets/b2.jpg';
import b3 from '../../../assets/b3.jpg';
import b4 from '../../../assets/b4.jpg';
import b5 from '../../../assets/b5.jpg';
import b6 from '../../../assets/b6.jpg';
import b7 from '../../../assets/b7.jpg';
import b8 from '../../../assets/b8.jpg';
import b9 from '../../../assets/b9.jpg';
import sys from '../../../assets/sys.jpg';
import bott from '../../../assets/bott.jpg';
import { FaFilePdf } from 'react-icons/fa';

const images = [b1, b2, b3, b4, b5, b6, b7, b8, b9];
const AUTO_SLIDE_INTERVAL = 3500;

function BottleUnscramblers() {
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
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-3 sm:mb-4 leading-tight">Bottle Unscramblers</h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6">Our bottle unscramblers are designed for seamless integration into your production line, ensuring bottles are correctly oriented and fed for downstream processes. Engineered for efficiency, flexibility, and minimal operator intervention.</p>
          <ul className="list-disc list-inside text-gray-700 text-left mx-auto md:mx-0 mb-4 sm:mb-6 space-y-2 max-w-xs">
            <li>High-speed bottle orientation and feeding</li>
            <li>Handles a wide range of bottle shapes and sizes</li>
            <li>Tool-less changeover for rapid format changes</li>
            <li>Robust stainless steel construction</li>
          </ul>
        </div>
        {/* Right: Carousel */}
        <div className="flex-1 w-full max-w-xl flex flex-col items-center">
          <div className="w-full aspect-video rounded-2xl shadow-xl overflow-hidden bg-black mb-3 sm:mb-4">
            <img
              src={images[current]}
              alt={`Bottle Unscrambler ${current + 1}`}
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

      {/* System Types & Bottle Formats Section */}
      <section className="max-w-6xl mx-auto px-2 sm:px-6 py-6 flex flex-col md:flex-row gap-6 md:gap-14 items-center">
        {/* System Types */}
        <div className="flex-1 bg-blue-50/60 rounded-2xl shadow p-4 sm:p-6 flex flex-col items-center border border-blue-100 max-w-xl w-full">
          <img
            src={sys}
            alt="System Types"
            className="w-full max-w-xs rounded-xl shadow mb-4 border border-blue-200"
            style={{ aspectRatio: '4/3', background: '#f3f4f6' }}
          />
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 4h-1v-4h-1m-4 4h-1v-4h-1m4 4h-1v-4h-1" /></svg>
            System Types
          </h3>
          <ul className="space-y-2 text-gray-800 w-full text-sm sm:text-base">
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Vibratory Bowl Sorting Machines <span className="text-gray-600">– for low output speeds up to 50upm.</span></li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Step Feeding Sorting Machines <span className="text-gray-600">– for medium output speeds up to 80upm with seamless product change-over.</span></li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Cavity / Centrifugal Sorting Unscrambling Machines <span className="text-gray-600">– for higher output & more dedicated production needs with speeds up to 240bpm.</span></li>
          </ul>
        </div>
        {/* Bottle Formats */}
        <div className="flex-1 bg-purple-50/60 rounded-2xl shadow p-4 sm:p-6 flex flex-col items-center border border-purple-100 max-w-xl w-full">
          <img
            src={bott}
            alt="Bottle Formats"
            className="w-full max-w-xs rounded-xl shadow mb-4 border border-purple-200"
            style={{ aspectRatio: '4/3', background: '#f3f4f6' }}
          />
          <h3 className="text-base sm:text-xl font-bold text-purple-800 mb-2 sm:mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" /></svg>
            Bottle Formats
          </h3>
          <ul className="space-y-2 text-gray-800 w-full text-sm sm:text-base">
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Ophthalmic containers</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Plastic tubes for the cosmetic industry</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Personal care products</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Hygienic containers</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Containers for the Agro-Chem & Petro-Chem sector</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Flexible bag & pouch sorting systems</li>
          </ul>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-3 bg-blue-50 my-4 sm:my-8" />

      {/* Supporting Info Cards */}
      <section className="max-w-6xl mx-auto px-2 sm:px-6 py-6 flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-stretch">
        {/* Vacuum Conveyor Card */}
        <div className="flex-1 bg-blue-100/60 rounded-xl shadow p-4 sm:p-5 flex flex-col items-center border border-blue-200 min-w-[140px] transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-2xl">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12l4-4m-4 4l4 4" /></svg>
          <h4 className="text-base sm:text-lg font-bold text-blue-800 mb-2">Vacuum Conveyor Systems</h4>
          <p className="text-gray-700 text-center text-xs sm:text-base">Ensure light weight and unstable bottles are supported throughout the transfer phase between the unscrambler and next operation conveyor.</p>
        </div>
        {/* SMED Change-over Card */}
        <div className="flex-1 bg-purple-100/60 rounded-xl shadow p-4 sm:p-5 flex flex-col items-center border border-purple-200 min-w-[140px] transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-2xl">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-purple-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" /></svg>
          <h4 className="text-base sm:text-lg font-bold text-purple-800 mb-2">SMED Change-over</h4>
          <p className="text-gray-700 text-center text-xs sm:text-base">Change-over between formats is simplified by adopting <span className="font-semibold">SMED (Single Minute Exchange of Die)</span> principles, allowing bottle change-parts to be changed over quickly in under 10-minutes with minimal fuss and instant return to maximum production efficiency.</p>
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

export default BottleUnscramblers;
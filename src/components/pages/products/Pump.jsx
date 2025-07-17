import React, { useRef, useState, useEffect } from 'react';
import pump1 from '../../../assets/pump1.png';
import pump2 from '../../../assets/pump2.png';
import pump3 from '../../../assets/pump3.png';
import pump4 from '../../../assets/pump4.png';
import pump5 from '../../../assets/pump5.png';
import pump6 from '../../../assets/pump6.png';
import pump7 from '../../../assets/pump7.png';
import pump8 from '../../../assets/pump8.png';
import { FaFilePdf } from 'react-icons/fa';

const images = [pump1, pump2, pump3, pump4, pump5, pump6, pump7, pump8];
const AUTO_SLIDE_INTERVAL = 3500;

function Pump() {
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
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-3 sm:mb-4 leading-tight">Pump & Trigger Feeding Systems</h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6">A range of dispensing pump and trigger feeding systems that carefully sort, feed and deliver pumps at up to 300upm.</p>
          <p className="text-sm sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6">Our cap / dispensing pump / trigger feeding systems have been designed and developed to provide an unrivalled combination of precision, quality and reliability.</p>
        </div>
        {/* Right: Carousel */}
        <div className="flex-1 w-full max-w-xl flex flex-col items-center">
          <div className="w-full aspect-video rounded-2xl shadow-xl overflow-hidden bg-black mb-3 sm:mb-4">
            <img
              src={images[current]}
              alt={`Pump & Trigger System ${current + 1}`}
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

      {/* System Types Section */}
      <section className="max-w-6xl mx-auto px-2 sm:px-6 py-6 flex flex-col md:flex-row gap-6 md:gap-14 items-center">
        {/* System Types */}
        <div className="flex-1 bg-blue-50/60 rounded-2xl shadow p-4 sm:p-6 flex flex-col items-center border border-blue-100 max-w-xl w-full">
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 4h-1v-4h-1m-4 4h-1v-4h-1m4 4h-1v-4h-1" /></svg>
            Feeding System Types
          </h3>
          <ul className="space-y-2 text-gray-800 w-full text-sm sm:text-base">
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Vibratory Bowl Feeding Systems <span className="text-gray-600">– designed for low output speeds up to 80upm.</span></li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Single stage Centrifugal Feeding Systems <span className="text-gray-600">– designed for medium to high output speeds up to 300upm for caps and dispensing pumps.</span></li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Double stage Centrifugal Feeding Systems <span className="text-gray-600">– designed to for medium to high output speeds for push-on and screw-on spray triggers at up to 300bpm.</span></li>
          </ul>
        </div>
        {/* Closure Types */}
        <div className="flex-1 bg-purple-50/60 rounded-2xl shadow p-4 sm:p-6 flex flex-col items-center border border-purple-100 max-w-xl w-full">
          <h3 className="text-base sm:text-xl font-bold text-purple-800 mb-2 sm:mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" /></svg>
            Closure Types
          </h3>
          <ul className="space-y-2 text-gray-800 w-full text-sm sm:text-base">
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Push-On Caps</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Screw-On Caps</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>ROPP Shells (caps)</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Dispensing Pumps</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Spray Triggers</li>
          </ul>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-3 bg-blue-50 my-4 sm:my-8" />

      {/* SMED Info Section */}
      <section className="max-w-6xl mx-auto px-2 sm:px-6 py-6 flex flex-col items-center">
        <div className="bg-white/90 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center border border-blue-100 w-full max-w-2xl">
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8M8 12h8" /></svg>
            SMED Change-over
          </h3>
          <p className="text-xs sm:text-base text-gray-700 text-center">Change-over between formats has been simplified by adopting <span className="font-semibold">SMED (Single Minute Exchange of Die)</span> principles that allow all change-parts to be changed over quickly in under 10-minutes with minimal fuss and instant return to maximum production efficiency.</p>
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

export default Pump;
   
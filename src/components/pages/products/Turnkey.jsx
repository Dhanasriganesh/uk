import React, { useRef, useState, useEffect } from 'react';
import turnkey1 from '../../../assets/turnkey1.png';
import turnkey2 from '../../../assets/turnkey2.png';
import turnkey3 from '../../../assets/turnkey3.png';
import turnkey4 from '../../../assets/turnkey4.png';
import turnkey5 from '../../../assets/turnkey5.png';
import turnkey6 from '../../../assets/turnkey6.png';
import turnkey7 from '../../../assets/turnkey7.png';
import turnkey8 from '../../../assets/turnkey8.png';
import turnkey9 from '../../../assets/turnkey9.png';
import { FaFilePdf } from 'react-icons/fa';

const images = [turnkey1, turnkey2, turnkey3, turnkey4, turnkey5, turnkey6, turnkey7, turnkey8, turnkey9];
const AUTO_SLIDE_INTERVAL = 3500;

function Turnkey() {
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
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-3 sm:mb-4 leading-tight">Turnkey Filling Lines</h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6">Complete filling line solutions from 10ml to 200-litre with the most diverse range of filling technologies available. From bottle unscramblers to end of line palletising.</p>
          <p className="text-sm sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6">Together with our long-established partners we are able to offer turn-key filling lines for the widest range of products from highly viscous to foamy products. A single source option for your complete filling line ensures it is fully balanced to maximise output.</p>
        </div>
        {/* Right: Carousel */}
        <div className="flex-1 w-full max-w-xl flex flex-col items-center">
          <div className="w-full aspect-video rounded-2xl shadow-xl overflow-hidden bg-black mb-3 sm:mb-4">
            <img
              src={images[current]}
              alt={`Turnkey Filling Line ${current + 1}`}
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

      {/* Filling Technologies Section */}
      <section className="max-w-6xl mx-auto px-2 sm:px-6 py-6 flex flex-col md:flex-row gap-6 md:gap-14 items-center">
        {/* Filling Technologies */}
        <div className="flex-1 bg-blue-50/60 rounded-2xl shadow p-4 sm:p-6 flex flex-col items-center border border-blue-100 max-w-xl w-full">
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 4h-1v-4h-1m-4 4h-1v-4h-1m4 4h-1v-4h-1" /></svg>
            Filling Technologies
          </h3>
          <ul className="space-y-2 text-gray-800 w-full text-sm sm:text-base">
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Volumetric displacement</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Flow-meter for hygienic applications</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-blue-500 inline-block"></span>High accuracy weigh filling</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Rotary Gear Pump</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Integrated Clean-in-Place systems</li>
          </ul>
        </div>
        {/* Machine Types */}
        <div className="flex-1 bg-purple-50/60 rounded-2xl shadow p-4 sm:p-6 flex flex-col items-center border border-purple-100 max-w-xl w-full">
          <h3 className="text-base sm:text-xl font-bold text-purple-800 mb-2 sm:mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" /></svg>
            Machine Types
          </h3>
          <ul className="space-y-2 text-gray-800 w-full text-sm sm:text-base">
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Bench Top systems</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Linear Filling machines (up to 12-heads)</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Twin-track filling machines up to (24-heads)</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Continuous Move / Walking Beam filling solutions</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>High speed rotary (up to 24-heads)</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Drum filling (by weight or flow-meter)</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Monobloc (clean / fill / cap)</li>
            <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>All available with Ex / FDA / CGMP certification</li>
          </ul>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-3 bg-blue-50 my-4 sm:my-8" />

      {/* Equipment Supplied Section */}
      <section className="max-w-6xl mx-auto px-2 sm:px-6 py-6 flex flex-col items-center">
        <div className="bg-white/90 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center border border-blue-100 w-full max-w-2xl">
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8M8 12h8" /></svg>
            Equipment Supplied
          </h3>
          <ul className="space-y-2 text-gray-800 w-full text-sm sm:text-base">
            <li>Bottle Unscramblers</li>
            <li>Liquid Filling Machines</li>
            <li>Capping Machines</li>
            <li>Inkjet Coding</li>
            <li>Induction Sealing</li>
            <li>Labelling</li>
            <li>Automatic Cartoning & Carton Sealing Equipment</li>
            <li>Case-packing & Palletising Systems</li>
          </ul>
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

export default Turnkey;
 
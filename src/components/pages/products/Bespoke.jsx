import React, { useState, useRef, useEffect } from 'react';
import be1 from '../../../assets/be1.png';
import be2 from '../../../assets/be2.png';
import be3 from '../../../assets/be3.png';
import be4 from '../../../assets/be4.png';
import be5 from '../../../assets/be5.png';
import be6 from '../../../assets/be6.png';
import be7 from '../../../assets/be7.png';
import be8 from '../../../assets/be8.png';
import be9 from '../../../assets/be9.png';
import be10 from '../../../assets/be10.png';
import be11 from '../../../assets/be11.png';
import { FaFilePdf } from 'react-icons/fa';

const images = [be1, be2, be3, be4, be5, be6, be7, be8, be9, be10, be11];
const AUTO_SLIDE_INTERVAL = 3500;

function Bespoke() {
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
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-3 sm:mb-4 leading-tight">Bespoke Packaging and Automation & Assembly Systems</h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6">From general conveyors, product feeding & handling, ultrasonic cap welding, vibrator bowls, assembly systems etc.</p>
        </div>
        {/* Right: Carousel */}
        <div className="flex-1 w-full max-w-xl flex flex-col items-center">
          <div className="w-full aspect-video rounded-2xl shadow-xl overflow-hidden bg-black mb-3 sm:mb-4">
            <img
              src={images[current]}
              alt={`Bespoke System ${current + 1}`}
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

      {/* Automation & Assembly Systems Section */}
      <section className="max-w-6xl mx-auto px-2 sm:px-6 py-6 flex flex-col items-center">
        <div className="bg-white/90 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center border border-blue-100 w-full max-w-2xl">
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Automation & Assembly Systems</h3>
          <p className="text-xs sm:text-base text-gray-700 text-center mb-2">Our Smart Feeder product is an intelligent system for the feeding and assembly of a wide range of packaging material products. Robotic control, collaborative or otherwise, is part of our DNA with an amazing and experienced team ready for your next automation or assembly application. We have huge experience with Fanuc, Staubli, Adept, Kuka etc. Together with our 'time served' automotive skills we can provide a turnkey solution to exceed any requirement and our vision system inspection (VSI) systems guarantee your product has been handled, assembled and checked before dispatch.</p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-3 bg-blue-50 my-4 sm:my-8" />

      {/* Packaging Automation Section */}
      <section className="max-w-6xl mx-auto px-2 sm:px-6 py-6 flex flex-col items-center">
        <div className="bg-white/90 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center border border-blue-100 w-full max-w-2xl">
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Packaging Automation</h3>
          <p className="text-xs sm:text-base text-gray-700 text-center mb-2">ATS Packaging automation revolutionizes production efficiency, streamlining processes and ensuring consistent quality. With ATS automated solutions, businesses experience heightened productivity and reduced labor costs, optimizing their packaging operations for success.</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-2 text-left max-w-2xl mx-auto">
            <li>Automatic case erecting for swift and precise box assembly</li>
            <li>Automatic packing for efficient and uniform product placement</li>
            <li>Automatic case sealing for evenly secure closure and product protection</li>
            <li>Automatic palletising for seamless stacking and loading, enhancing logistics efficiency and overall productivity.</li>
          </ul>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-3 bg-blue-50 my-4 sm:my-8" />

      {/* Case Erecting/Packing Section */}
      <section className="max-w-6xl mx-auto px-2 sm:px-6 py-6 flex flex-col items-center">
        <div className="bg-white/90 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center border border-blue-100 w-full max-w-2xl">
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Automatic Case Erecting and Packing</h3>
          <p className="text-xs sm:text-base text-gray-700 text-center mb-2">Automatic Packing and Case Erecting will be carried out by robots equipped with suitable tooling and grippers for box erecting and picking and placing jerry cans or bottles. This robot’s main task will be to keep up with the throughputs of filling station and maintain smooth operation without stopping.</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-2 text-left max-w-2xl mx-auto">
            <li>Machine Type: Automatic Case Erecting & Packing</li>
            <li>Output Speed: 18-20 case per Minute</li>
          </ul>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-3 bg-blue-50 my-4 sm:my-8" />

      {/* Case Sealing Section */}
      <section className="max-w-6xl mx-auto px-2 sm:px-6 py-6 flex flex-col items-center">
        <div className="bg-white/90 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center border border-blue-100 w-full max-w-2xl">
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Automated Case Sealing</h3>
          <p className="text-xs sm:text-base text-gray-700 text-center mb-2">The ATS Automated Case Sealer is designed as a fixed format solution, requiring manual adjustments for precise operation. Ideal for long production runs with consistent box dimensions, this machine seamlessly applies two self-adhesive tape stripes along the upper and lower middle lines of boxes. With intuitive controls and straightforward operation, the ATS Automated Case Sealer ensures efficiency, simplicity, and rapid adjustment for optimized packaging processes.</p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-3 bg-blue-50 my-4 sm:my-8" />

      {/* Palletising Section */}
      <section className="max-w-6xl mx-auto px-2 sm:px-6 py-6 flex flex-col items-center">
        <div className="bg-white/90 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center border border-blue-100 w-full max-w-2xl">
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Automated Palletising</h3>
          <p className="text-xs sm:text-base text-gray-700 text-center mb-2">ATS Automated Palletising employs a versatile robot equipped with a gripper tailored for handling multiple configurations, with specific design confirmation upon order. The primary function of this robot is to seamlessly integrate with the packing station, maintaining uninterrupted operation to keep pace with production throughputs. A single roller conveyor connects the cell to the taping machine, facilitating the smooth flow of products to the robot for palletising.</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-2 text-left max-w-2xl mx-auto">
            <li>Machine Type: Automatic Palletising</li>
            <li>Output Speed: 18-20 cases Maximum per Minute</li>
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

export default Bespoke;

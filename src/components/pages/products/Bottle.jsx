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
import styled from 'styled-components';
 
const images = [b1, b2, b3, b4, b5, b6, b7, b8, b9];
const AUTO_SLIDE_INTERVAL = 3000;
const THUMB_SIZE = 100;
 
function BottleUnscramblers() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoSlideRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
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
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setPaused(false), 5000);
  };
 
  return (
    <>
      {/* Carousel Section: Images right, text left */}
      <section className="w-full flex flex-col md:flex-row justify-center items-center gap-10 px-4 py-10 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Left: Bottle Unscramblers Text */}
        <div className="flex-1 max-w-xl min-w-[280px] flex flex-col justify-start h-full">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 font-sans tracking-tight">Bottle Unscramblers</h2>
          <p className="text-lg md:text-xl text-gray-800 mb-4 font-sans">Our bottle unscramblers are designed for seamless integration into your production line, ensuring bottles are correctly oriented and fed for downstream processes. Engineered for efficiency, flexibility, and minimal operator intervention.</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>High-speed bottle orientation and feeding</li>
            <li>Handles a wide range of bottle shapes and sizes</li>
            <li>Tool-less changeover for rapid format changes</li>
            <li>Robust stainless steel construction</li>
          </ul>
        </div>
        {/* Right: Carousel Images */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl h-full">
          <div
            key={current}
            className="rounded-3xl shadow-xl overflow-hidden bg-black w-full max-w-3xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-4 hover:border-blue-400"
            style={{ aspectRatio: '16/9' }}
          >
            <img
              src={images[current]}
              alt={`Bottle Unscrambler ${current + 1}`}
              className="w-full h-full object-cover rounded-3xl"
              draggable={false}
              style={{ userSelect: 'none' }}
            />
          </div>
          {/* Thumbnails */}
          <div
            ref={thumbContainerRef}
            className="flex flex-row gap-3 mt-8 overflow-x-auto w-full max-w-xl px-2 justify-center scrollbar-hide"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                ref={el => thumbRefs.current[idx] = el}
                onClick={() => handleThumbClick(idx)}
                className={`rounded-xl overflow-hidden border-2 transition-all duration-200 ${idx === current ? 'border-blue-500 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'}`}
                style={{ width: THUMB_SIZE, height: THUMB_SIZE, minWidth: THUMB_SIZE, minHeight: THUMB_SIZE }}
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
      </section>
      {/* Enhanced Info Section: Bottle Unscramblers Details */}
      <section className="w-full flex justify-center mt-12 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 font-sans">
        <div className="max-w-5xl w-full bg-white/95 rounded-3xl shadow-xl border border-blue-100 p-0 md:p-0">
          {/* Hero Image and Title */}
          <div className="flex flex-col items-center justify-center pt-8 px-4">
            <img
              src={b1}
              alt="Bottle unscrambler hero"
              className="w-full max-w-2xl rounded-2xl shadow-md object-cover mb-6 border border-blue-100 transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ aspectRatio: '16/7', background: '#f3f4f6' }}
            />
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-2 mb-2 text-center tracking-tight leading-tight">
              Bottle Unscramblers
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-2 text-center font-light">
              A versatile range of bottle unscramblers that allow multiple container formats to be carefully sorted and orientated in a single machine system.
            </p>
            <p className="text-lg md:text-xl text-gray-700 mb-8 text-center font-light">
              Our bottle sorting / unscrambling machines have been designed and developed to provide an unrivalled combination of precision, quality and reliability.
            </p>
          </div>
          {/* Two-Column Grid */}
          <div className="grid md:grid-cols-2 gap-10 items-start px-4 md:px-10 mb-8">
            {/* Left Column: System Types */}
            <div className="bg-blue-50/60 rounded-2xl shadow p-6 flex flex-col items-center border border-blue-100 transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-2xl">
              <img
                src={sys}
                alt="System Types"
                className="w-full max-w-xs rounded-xl shadow mb-4 border border-blue-200 transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ aspectRatio: '4/3', background: '#f3f4f6' }}
              />
              <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 4h-1v-4h-1m-4 4h-1v-4h-1m4 4h-1v-4h-1" /></svg>
                System Types
              </h3>
              <ul className="space-y-4 text-gray-800 w-full">
                <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Vibratory Bowl Sorting Machines <span className="text-gray-600">– for low output speeds up to 50upm.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Step Feeding Sorting Machines <span className="text-gray-600">– for medium output speeds up to 80upm with seamless product change-over.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-blue-500 inline-block"></span>Cavity / Centrifugal Sorting Unscrambling Machines <span className="text-gray-600">– for higher output & more dedicated production needs with speeds up to 240bpm.</span></li>
              </ul>
            </div>
            {/* Right Column: Bottle Formats */}
            <div className="bg-purple-50/60 rounded-2xl shadow p-6 flex flex-col items-center border border-purple-100 transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-2xl">
              <img
                src={bott}
                alt="Bottle Formats"
                className="w-full max-w-xs rounded-xl shadow mb-4 border border-purple-200 transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ aspectRatio: '4/3', background: '#f3f4f6' }}
              />
              <h3 className="text-xl md:text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" /></svg>
                Bottle Formats
              </h3>
              <ul className="space-y-4 text-gray-800 w-full">
                <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Ophthalmic containers</li>
                <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Plastic tubes for the cosmetic industry</li>
                <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Personal care products</li>
                <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Hygienic containers</li>
                <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Containers for the Agro-Chem & Petro-Chem sector</li>
                <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 rounded-full bg-purple-500 inline-block"></span>Flexible bag & pouch sorting systems</li>
              </ul>
            </div>
          </div>
          {/* Supporting Info Cards */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch px-4 md:px-10 pb-10">
            {/* Vacuum Conveyor Card */}
            <div className="flex-1 bg-blue-100/60 rounded-xl shadow p-5 flex flex-col items-center border border-blue-200 min-w-[220px] transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-2xl">
              <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12l4-4m-4 4l4 4" /></svg>
              <h4 className="text-lg font-bold text-blue-800 mb-2">Vacuum Conveyor Systems</h4>
              <p className="text-gray-700 text-center text-base">Ensure light weight and unstable bottles are supported throughout the transfer phase between the unscrambler and next operation conveyor.</p>
            </div>
            {/* SMED Change-over Card */}
            <div className="flex-1 bg-purple-100/60 rounded-xl shadow p-5 flex flex-col items-center border border-purple-200 min-w-[220px] transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-2xl">
              <svg className="w-8 h-8 text-purple-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" /></svg>
              <h4 className="text-lg font-bold text-purple-800 mb-2">SMED Change-over</h4>
              <p className="text-gray-700 text-center text-base">Change-over between formats is simplified by adopting <span className="font-semibold">SMED (Single Minute Exchange of Die)</span> principles, allowing bottle change-parts to be changed over quickly in under 10-minutes with minimal fuss and instant return to maximum production efficiency.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Modern Black/White Buttons Section with direct shadow */}
      <ModernButtonRow>
        <ModernButton variant="black" href="/src/assets/pdf_1718978495.pdf" target="_blank" rel="noopener noreferrer">
          Download Brochure
        </ModernButton>
        <ModernButton variant="white" href="/contact">
          Enquire about this Product
        </ModernButton>
      </ModernButtonRow>
    </>
  );
}
 
export default BottleUnscramblers
 
// Styled-components for custom button style
const ModernButtonRow = styled.div`
  display: flex;
  gap: 32px;
  justify-content: center;
  margin: 48px auto 0 auto;
  width: 100%;
  max-width: 700px;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 18px;
    align-items: center;
  }
`;
const ModernButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  min-height: 60px;
  padding: 0 36px;
  border-radius: 14px;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18), 0 2px 8px 0 rgba(0,0,0,0.10);
  text-decoration: none;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  text-align: center;
  border: 1.5px solid transparent;
  background: ${props => props.variant === 'black' ? '#111' : '#fff'};
  color: ${props => props.variant === 'black' ? '#fff' : '#111'};
  border-color: ${props => props.variant === 'white' ? '#ddd' : 'transparent'};
  &:hover {
    box-shadow: 0 16px 48px 0 rgba(0,0,0,0.22), 0 2px 8px 0 rgba(0,0,0,0.12);
    transform: translateY(-2px) scale(1.03);
  }
`;
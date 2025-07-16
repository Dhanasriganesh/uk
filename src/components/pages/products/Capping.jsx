import React, { useRef, useState, useEffect } from 'react';
import i1 from '../../../assets/i1.jpg';
import i3 from '../../../assets/i3.png';
import i4 from '../../../assets/i4.jpg';
import i5 from '../../../assets/i5.jpg';
import i7 from '../../../assets/i7.jpg';
import i8 from '../../../assets/i8.jpg';
import i9 from '../../../assets/i9.jpg';
import i10 from '../../../assets/i10.jpg';
import { BsWrenchAdjustable } from 'react-icons/bs';
import { FaQuinscape } from 'react-icons/fa';
import { FaGears } from 'react-icons/fa6';
import { MdOutlineTimer, MdVolumeOff, MdVolumeUp } from 'react-icons/md';
import styled from 'styled-components';
import { FaFilePdf } from 'react-icons/fa';
 
const images = [i1, i3, i4, i5, i7, i8, i9, i10];
const AUTO_SLIDE_INTERVAL = 3000;
const THUMB_SIZE = 100;
 
function CappingMachines() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoSlideRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const thumbContainerRef = useRef(null);
  const thumbRefs = useRef([]);
  // For video mute/unmute
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  // For Linear video mute/unmute
  const [isLinearMuted, setIsLinearMuted] = useState(true);
  const linearVideoRef = useRef(null);
 
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
 
  // Scroll active thumbnail into view when current changes
  useEffect(() => {
    // Only scroll the thumbnail container horizontally, don't affect page scroll
    if (thumbContainerRef.current && thumbRefs.current[current]) {
      const container = thumbContainerRef.current;
      const activeThumb = thumbRefs.current[current];
      const containerRect = container.getBoundingClientRect();
      const thumbRect = activeThumb.getBoundingClientRect();
      // Calculate the scroll position to center the active thumbnail
      const offset = thumbRect.left - containerRect.left - (containerRect.width / 2) + (thumbRect.width / 2);
      container.scrollTo({ left: container.scrollLeft + offset, behavior: 'smooth' });
    }
  }, [current]);
 
  // Resume auto-slide after 5s if paused by thumbnail click
  const handleThumbClick = (idx) => {
    setCurrent(idx);
    setPaused(true);
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setPaused(false), 5000);
  };
 
  return (
    <>
      {/* Carousel Section: Video right, text left */}
      <section className="w-full flex flex-col md:flex-row justify-center items-center gap-10 px-4 py-10 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Left: Capping Machines Text */}
        <div className="flex-1 max-w-xl min-w-[280px] flex flex-col justify-start h-full">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 font-sans tracking-tight">Capping Machines</h2>
          <p className="text-lg md:text-xl text-gray-800 mb-4 font-sans">Discover our advanced capping machines, engineered for precision, speed, and reliability. From linear to rotary systems, our solutions ensure secure, consistent closures for a wide range of products and industries.</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>High-speed, high-precision capping</li>
            <li>Supports screw, press-on, and specialty caps</li>
            <li>Easy changeover and minimal downtime</li>
            <li>Customizable for your production needs</li>
          </ul>
        </div>
        {/* Right: Carousel Video/Images */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl h-full">
          <div
            key={current}
            className="rounded-3xl shadow-xl overflow-hidden bg-black w-full max-w-3xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-4 hover:border-blue-400"
            style={{ aspectRatio: '16/9' }}
          >
            <img
              src={images[current]}
              alt={`Capping ${current + 1}`}
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
      {/* Capping Machines Info Section */}
      <div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full flex justify-center mt-12 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 font-sans"
      >
        <div className="max-w-5xl w-full bg-white/95 rounded-3xl shadow-xl border border-blue-100 p-8 md:p-16">
          <h2 className="text-2xl md:text-4xl font-semibold text-black-900 mb-6 text-center tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text ">Capping Machines</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-4 text-center font-light">
            The most complete range of capping machines for a wide range of applications from linear cappers, high speed rotary cappers, pump / spray trigger tightening and change-parts.
          </p>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 text-center font-light">
            Our UK manufactured capping machines have been designed and developed to provide an unrivalled combination of precision, quality and reliability.
          </p>
          <div className="grid md:grid-cols-3 gap-10 items-stretch">
            {/* Column 1 */}
            <div className="bg-white/90 rounded-2xl shadow-md p-6 flex flex-col items-start mb-4 md:mb-0 aspect-square min-w-[220px] max-w-[340px] w-full h-auto transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-blue-400 border border-blue-100">
              <h3 className="text-2xl font-bold text-blue-800 mb-5 flex items-center gap-2 tracking-tight" aria-label="Capping Machine Types"><FaGears className="mr-2 align-middle text-blue-500 text-2xl" /> Unique Systems</h3>
              <ul className="space-y-4 w-full list-disc list-inside">
                <li><strong>Single Spindle</strong> Capping Machine</li>
                <li><strong>Linear</strong> Capping Machine</li>
                <li><strong>Rotary</strong> Capping Machine</li>
              </ul>
            </div>
            {/* Column 2 */}
            <div className="bg-white/90 rounded-2xl shadow-md p-6 flex flex-col items-start mb-4 md:mb-0 aspect-square min-w-[220px] max-w-[340px] w-full h-auto transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-green-400 border border-green-100">
              <h3 className="text-2xl font-bold text-green-800 mb-5 flex items-center gap-2 tracking-tight" aria-label="Closure Applications"><FaQuinscape className="mr-2 align-middle text-green-500 text-2xl" /> Closure Applications</h3>
              <ul className="space-y-4 w-full list-disc list-inside">
                <li>Screw-on Caps</li>
                <li>Press-on Caps</li>
                <li>ROPP Caps</li>
                <li>Dispensing Pumps</li>
                <li>Spray Triggers</li>
                <li>Ultrasonic Welded Caps</li>
              </ul>
            </div>
            {/* Column 3 */}
            <div className="bg-white/90 rounded-2xl shadow-md p-6 flex flex-col items-start mb-4 md:mb-0 aspect-square min-w-[220px] max-w-[340px] w-full h-auto transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-purple-400 border border-purple-100">
              <h3 className="text-2xl font-bold text-purple-800 mb-5 flex items-center gap-2 tracking-tight" aria-label="Tightening Technology"><BsWrenchAdjustable className="mr-2 align-middle text-purple-500 text-2xl" /> Tightening Technology</h3>
              <ul className="space-y-4 w-full list-disc list-inside">
                <li>Friction, Magnetic, Hysteresis Clutch</li>
                <li>Servo-controlled Tightening</li>
                <li>Torque Sensor Tightening</li>
              </ul>
            </div>
          </div>
          {/* SMED/Change-over Info Block */}
          <div className="mt-10 flex justify-center">
            <div className="bg-white/90 rounded-2xl shadow-md p-6 flex flex-col items-start w-full max-w-3xl h-auto transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-blue-400 border border-blue-100">
              <h3 className="text-2xl font-bold text-blue-800 mb-5 flex items-center gap-2 tracking-tight" aria-label="Quick Changeover"><MdOutlineTimer className="mr-2 align-middle text-blue-500 text-2xl" /> Quick Changeover (SMED)</h3>
              <p className="text-base md:text-lg text-blue-900 font-medium">
                Change-over between formats has been simplified by adopting <span className="font-semibold">SMED (Single Minute Exchange of Die)</span> principles that allow not only the bottle change-parts to be changed over quickly but the cap feeding change-parts too. Typical product change-overs can be completed in under <span className="font-semibold">15-minutes</span> with minimal fuss and instant return to maximum production efficiency.
              </p>
            </div>
          </div>
        </div> {/* End of main info card container */}
      </div>
 
      {/* Rotary Capping Machines Section - now a separate section */}
      <section className="w-full min-h-screen flex flex-col md:flex-row justify-center items-center gap-10 px-4 py-10 md:py-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Left: Text Content */}
        <div className="flex-1 max-w-2xl min-w-[320px] p-0 md:p-0">
          <h2 className="text-4xl font-semibold text-black mb-6 font-sans tracking-tight flex items-center gap-3">
            <FaGears className="text-gray-700 text-3xl" /> Rotary Capping Machines
          </h2>
          <p className="text-lg md:text-xl text-gray-900 mb-4 font-sans">Our higher speed rotary capping machines can be supplied with up to 10-heads and achieve speeds of up to 240bpm. Both 'traditional' magnetic clutch and 'advanced servo-controlled' tightening technologies can be used.</p>
          <p className="text-base md:text-lg text-gray-800 mb-2 font-sans">Other advanced options include:</p>
          <ul className="mb-4 space-y-3 text-gray-800">
            <li className="flex items-start gap-2"><span className="mt-2 w-2 h-2 rounded-full bg-gray-700 inline-block"></span><span><b>(SS)</b> Servo Scroll – provides total scroll feed-worm control should a capping head need to be switched off for any reason.</span></li>
            <li className="flex items-start gap-2"><span className="mt-2 w-2 h-2 rounded-full bg-gray-700 inline-block"></span><span><b>(ECL)</b> Electronic Cam Lift – provides configurable control on the vertical movement of the capping head.</span></li>
            <li className="flex items-start gap-2"><span className="mt-2 w-2 h-2 rounded-full bg-gray-700 inline-block"></span><span><b>(DTA)</b> Dip Tube Alignment – provides configurable control on the alignment and insertion of dispensing pump and spray trigger dip tubes.</span></li>
            <li className="flex items-start gap-2"><span className="mt-2 w-2 h-2 rounded-full bg-gray-700 inline-block"></span><span><b>(STA)</b> Spray Trigger Alignment – provides radial control and alignment of spray trigger devices relative to container orientation.</span></li>
          </ul>
          <p className="text-base md:text-lg text-gray-900 font-sans">Suitable for screw-caps, push-on caps, dispensing pumps, spray triggers and ultrasonic cap welding applications.</p>
        </div>
        {/* Right: Video */}
        <div className="flex justify-center items-center relative">
          <video
            ref={videoRef}
            src="/videos/Rotary Capping Machine with Automatic Rejection System _ ATS UK Ltd.mp4"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="rounded-2xl shadow-lg border border-gray-200 w-full h-auto object-contain bg-white cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-blue-400"
            style={{ maxHeight: '440px', minWidth: '320px', background: 'white' }}
            onClick={() => setIsMuted(false)}
            title={isMuted ? 'Click to unmute' : 'Click to mute'}
          />
          {/* Mute/Unmute Icon */}
          <button
            type="button"
            onClick={() => setIsMuted(m => !m)}
            className="absolute top-3 right-3 bg-white/80 rounded-full p-1 shadow hover:bg-white transition z-10"
            style={{ lineHeight: 0 }}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <MdVolumeOff className="text-blue-600 text-xl" />
            ) : (
              <MdVolumeUp className="text-blue-600 text-xl" />
            )}
          </button>
        </div>
      </section>
 
      {/* Linear Capping Machines Section */}
      <section className="w-full min-h-screen flex flex-col md:flex-row justify-center items-center gap-10 px-4 py-10 md:py-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Left: Text Content */}
        <div className="flex-1 max-w-2xl min-w-[320px] p-0 md:p-0">
          <h2 className="text-4xl font-semibold text-black mb-6 font-sans tracking-tight">Linear Capping Machines</h2>
          <p className="text-lg md:text-xl text-gray-900 mb-4 font-sans">This revolutionary new style of machine removes the need for expensive bottle change-parts and allows the machine to be mounted over an existing conveyor system and moved between production lines.</p>
          <p className="text-base md:text-lg text-gray-800 mb-2 font-sans">With a range of bottle handling systems including:</p>
          <ul className="mb-4 space-y-3 text-gray-800">
            <li className="flex items-start gap-2"><span className="mt-2 w-2 h-2 rounded bg-gray-700 inline-block"></span><span><b>(PG)</b> Pneumatic gate feeding</span></li>
            <li className="flex items-start gap-2"><span className="mt-2 w-2 h-2 rounded bg-gray-700 inline-block"></span><span><b>(FS)</b> Feed-worm scroll feeding</span></li>
            <li className="flex items-start gap-2"><span className="mt-2 w-2 h-2 rounded bg-gray-700 inline-block"></span><span><b>(CM)</b> Continuous move / transfer system feeding</span></li>
          </ul>
          <p className="text-base md:text-lg text-gray-900 font-sans mb-4">Both ‘traditional’ magnetic clutch and ‘advanced servo-controlled’ tightening technologies can be used. Maximum output speed depends on the number of capping heads and bottle handling system selected but typically up to 80bpm is easily achievable.</p>
          <p className="text-base md:text-lg text-gray-900 font-sans mb-4">Suitable for screw-caps, push-on caps, dispensing pumps, spray triggers and ultrasonic cap welding applications.</p>
      
    </div>
        {/* Right: Video */}
        <div className="flex justify-center items-center relative">
          <video
            ref={linearVideoRef}
            src="/videos/ATS Liner Capping Machine with Reverse Thread Engagement _ ATS UK Ltd.mp4"
            autoPlay
            muted={isLinearMuted}
            loop
            playsInline
            className="rounded-2xl shadow-lg border border-gray-200 bg-white cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-blue-400"
            style={{ maxHeight: '440px', maxWidth: '100%', background: 'white', display: 'block' }}
            title="Linear Capping Machine Video"
          />
          {/* Mute/Unmute Icon */}
          <button
            type="button"
            onClick={() => setIsLinearMuted(m => !m)}
            className="absolute top-3 right-3 bg-white/80 rounded-full p-1 shadow hover:bg-white transition z-10"
            style={{ lineHeight: 0 }}
            aria-label={isLinearMuted ? 'Unmute video' : 'Mute video'}
          >
            {isLinearMuted ? (
              <MdVolumeOff className="text-blue-600 text-xl" />
            ) : (
              <MdVolumeUp className="text-blue-600 text-xl" />
            )}
          </button>
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
 
export default CappingMachines;
 
// Styled-components for custom button style
const StyledWrapper = styled.div`
  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    width: 240px;
    min-height: 80px;
    background: ${props => props.variant === 'dark' ? '#444' : '#e5e7eb'};
    border-radius: 30px;
    border: 1.5px solid #444;
    transition: all 0.2s ease;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: ${props => props.variant === 'dark' ? '#fff' : '#232323'};
    text-shadow: none;
    gap: 0.7rem;
    padding: 0 18px;
    white-space: normal;
    text-align: center;
    line-height: 1.2;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  button svg {
    margin-bottom: 0;
    font-size: 1.4rem !important;
  }
  button:hover {
    filter: brightness(1.08);
    box-shadow: 0 6px 18px 0 rgba(0,0,0,0.10);
    border-color: #111;
  }
`;
const ButtonRow = styled.div`
  display: flex;
  width: 100%;
  max-width: 900px;
  margin: 48px auto 0 auto;
  gap: 32px;
  justify-content: center;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 18px;
    align-items: center;
  }
`;
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
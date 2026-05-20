import React, { useRef, useState, useEffect } from 'react';
import { useCmsPage } from '../../../hooks/useCmsPage';
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
import { FaFilePdf } from 'react-icons/fa';
 
const images = [i1, i3, i4, i5, i7, i8, i9, i10];
const AUTO_SLIDE_INTERVAL = 3500;
 
function CappingMachines() {
  const { content } = useCmsPage('capping');
  const hero = content.hero || {};
  const heroBullets = hero.bullets?.length ? hero.bullets : [
    'High-speed, high-precision capping',
    'Supports screw, press-on, and specialty caps',
    'Easy changeover and minimal downtime',
    'Customizable for your production needs',
  ];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoSlideRef = useRef(null);
  const thumbContainerRef = useRef(null);
  const thumbRefs = useRef([]);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const [isLinearMuted, setIsLinearMuted] = useState(true);
  const linearVideoRef = useRef(null);
 
  // Auto-slide carousel
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
 
  // Scroll active thumbnail into view
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
 
  // Pause/resume on thumbnail click
  const handleThumbClick = (idx) => {
    setCurrent(idx);
    setPaused(true);
    setTimeout(() => setPaused(false), 4000);
  };
 
  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <section className="site-container py-8 sm:py-12 lg:py-14">
        <div className="page-hero-grid">
        <div className="w-full max-w-xl flex-1 text-center md:text-left">
          <h1 className="page-hero-title font-bold text-blue-900 mb-3 sm:mb-4 leading-tight">{hero.title || 'Capping Machines'}</h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6">{hero.intro || 'Discover our advanced capping machines, engineered for precision, speed, and reliability.'}</p>
          <ul className="list-disc list-inside text-gray-700 text-left mx-auto md:mx-0 mb-4 sm:mb-6 space-y-2 max-w-xs">
            {heroBullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        {/* Right: Carousel */}
        <div className="flex-1 w-full max-w-xl flex flex-col items-center">
          <div className="w-full aspect-video rounded-2xl shadow-xl overflow-hidden bg-black mb-3 sm:mb-4">
            <img
              src={images[current]}
              alt={`Capping ${current + 1}`}
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
                className={`h-12 w-12 min-h-12 min-w-12 overflow-hidden rounded-lg border-2 transition-all duration-200 sm:h-[60px] sm:w-[60px] sm:min-h-[60px] sm:min-w-[60px] ${idx === current ? 'border-blue-500 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'}`}
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
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-3 bg-blue-50 my-4 sm:my-8" />

      {/* Features/Benefits Section */}
      <section className="site-container py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white/90 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-start aspect-square min-w-[140px] w-full h-auto transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-blue-100">
          <h3 className="text-base sm:text-xl font-bold text-blue-800 mb-2 sm:mb-3 flex items-center gap-2"><FaGears className="text-blue-500 text-lg sm:text-xl" /> Unique Systems</h3>
          <ul className="space-y-1 sm:space-y-2 w-full list-disc list-inside text-gray-700 text-sm sm:text-base">
            <li>Single Spindle Capping Machine</li>
            <li>Linear Capping Machine</li>
            <li>Rotary Capping Machine</li>
              </ul>
            </div>
        <div className="bg-white/90 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-start aspect-square min-w-[140px] w-full h-auto transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-green-100">
          <h3 className="text-base sm:text-xl font-bold text-green-800 mb-2 sm:mb-3 flex items-center gap-2"><FaQuinscape className="text-green-500 text-lg sm:text-xl" /> Closure Applications</h3>
          <ul className="space-y-1 sm:space-y-2 w-full list-disc list-inside text-gray-700 text-sm sm:text-base">
                <li>Screw-on Caps</li>
                <li>Press-on Caps</li>
                <li>ROPP Caps</li>
                <li>Dispensing Pumps</li>
                <li>Spray Triggers</li>
                <li>Ultrasonic Welded Caps</li>
              </ul>
            </div>
        <div className="bg-white/90 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-start aspect-square min-w-[140px] w-full h-auto transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-purple-100">
          <h3 className="text-base sm:text-xl font-bold text-purple-800 mb-2 sm:mb-3 flex items-center gap-2"><BsWrenchAdjustable className="text-purple-500 text-lg sm:text-xl" /> Tightening Technology</h3>
          <ul className="space-y-1 sm:space-y-2 w-full list-disc list-inside text-gray-700 text-sm sm:text-base">
                <li>Friction, Magnetic, Hysteresis Clutch</li>
                <li>Servo-controlled Tightening</li>
                <li>Torque Sensor Tightening</li>
              </ul>
            </div>
      </section>

      {/* Divider */}
      <div className="w-full h-3 bg-blue-50 my-4 sm:my-8" />
 
      {/* Rotary Capping Machines Section */}
      <section className="site-container py-8 sm:py-10 lg:py-12">
        <div className="page-hero-grid">
        {/* Left: Text Content */}
        <div className="flex-1 max-w-xl min-w-[180px] w-full mb-4 md:mb-0">
          <h2 className="text-lg sm:text-2xl md:text-4xl font-semibold text-blue-900 mb-2 sm:mb-4 flex items-center gap-2 sm:gap-3"><FaGears className="text-gray-700 text-lg sm:text-2xl md:text-3xl" /> Rotary Capping Machines</h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-900 mb-2 sm:mb-4">Our higher speed rotary capping machines can be supplied with up to 10-heads and achieve speeds of up to 240bpm. Both 'traditional' magnetic clutch and 'advanced servo-controlled' tightening technologies can be used.</p>
          <ul className="mb-2 sm:mb-4 space-y-1 sm:space-y-2 text-gray-800 text-xs sm:text-base">
            <li><b>(SS)</b> Servo Scroll – provides total scroll feed-worm control should a capping head need to be switched off for any reason.</li>
            <li><b>(ECL)</b> Electronic Cam Lift – provides configurable control on the vertical movement of the capping head.</li>
            <li><b>(DTA)</b> Dip Tube Alignment – provides configurable control on the alignment and insertion of dispensing pump and spray trigger dip tubes.</li>
            <li><b>(STA)</b> Spray Trigger Alignment – provides radial control and alignment of spray trigger devices relative to container orientation.</li>
          </ul>
          <p className="text-xs sm:text-base md:text-lg text-gray-900">Suitable for screw-caps, push-on caps, dispensing pumps, spray triggers and ultrasonic cap welding applications.</p>
        </div>
        {/* Right: Video */}
        <div className="flex justify-center items-center relative w-full max-w-xl">
          <video
            ref={videoRef}
            src="/videos/Rotary Capping Machine with Automatic Rejection System _ ATS UK Ltd.mp4"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="max-h-[200px] w-full cursor-pointer rounded-2xl border border-gray-200 bg-white object-contain shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl sm:max-h-[280px] lg:max-h-[360px]"
            onClick={() => setIsMuted(false)}
            title={isMuted ? 'Click to unmute' : 'Click to mute'}
          />
          {/* Mute/Unmute Icon */}
          <button
            type="button"
            onClick={() => setIsMuted(m => !m)}
            className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow hover:bg-white transition z-10"
            style={{ lineHeight: 0 }}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <MdVolumeOff className="text-blue-600 text-lg sm:text-xl" />
            ) : (
              <MdVolumeUp className="text-blue-600 text-lg sm:text-xl" />
            )}
          </button>
        </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-3 bg-blue-50 my-4 sm:my-8" />
 
      {/* Linear Capping Machines Section */}
      <section className="site-container py-8 sm:py-10 lg:py-12">
        <div className="page-hero-grid">
        {/* Left: Text Content */}
        <div className="flex-1 max-w-xl min-w-[180px] w-full mb-4 md:mb-0">
          <h2 className="text-lg sm:text-2xl md:text-4xl font-semibold text-blue-900 mb-2 sm:mb-4">Linear Capping Machines</h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-900 mb-2 sm:mb-4">This revolutionary new style of machine removes the need for expensive bottle change-parts and allows the machine to be mounted over an existing conveyor system and moved between production lines.</p>
          <ul className="mb-2 sm:mb-4 space-y-1 sm:space-y-2 text-gray-800 text-xs sm:text-base">
            <li><b>(PG)</b> Pneumatic gate feeding</li>
            <li><b>(FS)</b> Feed-worm scroll feeding</li>
            <li><b>(CM)</b> Continuous move / transfer system feeding</li>
          </ul>
          <p className="text-xs sm:text-base md:text-lg text-gray-900 mb-2 sm:mb-4">Both ‘traditional’ magnetic clutch and ‘advanced servo-controlled’ tightening technologies can be used. Maximum output speed depends on the number of capping heads and bottle handling system selected but typically up to 80bpm is easily achievable.</p>
          <p className="text-xs sm:text-base md:text-lg text-gray-900 mb-2 sm:mb-4">Suitable for screw-caps, push-on caps, dispensing pumps, spray triggers and ultrasonic cap welding applications.</p>
    </div>
        {/* Right: Video */}
        <div className="flex justify-center items-center relative w-full max-w-xl">
          <video
            ref={linearVideoRef}
            src="/videos/ATS Liner Capping Machine with Reverse Thread Engagement _ ATS UK Ltd.mp4"
            autoPlay
            muted={isLinearMuted}
            loop
            playsInline
            className="block max-h-[200px] w-full cursor-pointer rounded-2xl border border-gray-200 bg-white object-contain shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-2xl sm:max-h-[280px] lg:max-h-[360px]"
            title="Linear Capping Machine Video"
          />
          {/* Mute/Unmute Icon */}
          <button
            type="button"
            onClick={() => setIsLinearMuted(m => !m)}
            className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow hover:bg-white transition z-10"
            style={{ lineHeight: 0 }}
            aria-label={isLinearMuted ? 'Unmute video' : 'Mute video'}
          >
            {isLinearMuted ? (
              <MdVolumeOff className="text-blue-600 text-lg sm:text-xl" />
            ) : (
              <MdVolumeUp className="text-blue-600 text-lg sm:text-xl" />
            )}
          </button>
        </div>
        </div>
      </section>
 
      {/* Divider */}
      <div className="w-full h-3 bg-blue-50 my-4 sm:my-8" />

      {/* CTA Section */}
      <section className="site-container flex w-full flex-col items-center justify-center py-8">
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
 
export default CappingMachines;
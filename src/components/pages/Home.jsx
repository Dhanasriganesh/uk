import React, { useState, useEffect, useRef } from 'react'
import Services from './Services';
import Why from './Why';
import Connect from './Connect';
import Sectors from './Sectors';
import atsVideo from '../../assets/ats-uk.mp4';
import Brands from './Brands';
// Add Google Fonts import for Playfair Display in the document head
if (typeof document !== 'undefined' && !document.getElementById('playfair-font')) {
  const link = document.createElement('link');
  link.id = 'playfair-font';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';
  document.head.appendChild(link);
}

const images = [
  'https://keyvendors.com/blogs/wp-content/uploads/2023/06/simple-living-room-1.jpg',
  'https://restaurantinteriordesign.eu/wp-content/uploads/2018/04/Hollywood_Roosevelt_Hotel.jpg',
  'https://d28pk2nlhhgcne.cloudfront.net/assets/app/uploads/sites/3/2023/05/how-to-design-restaurant-interior-help-3d-3-1220x671.jpg',
  'https://mohhinteriors.com/wp-content/uploads/2024/05/expensive-restaurant-interior-view-with-colorful-illuminating-scaled.jpg',
];

const heroTexts = [
  'Flexible linear capping and high-speed rotary capping machines',
  'Advanced calibrated torque sensor Tightening options',
  'Screw-on caps / Push-on caps / Pumps / Spray triggers',
  'Spray Trigger Feeding Systems up to 200upm',
  'Bottle Unscramblers up to 200bpm',
];

function Home() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  // Add state for hero text
  const [heroIndex, setHeroIndex] = useState(0);
  // Ref for video
  const videoRef = useRef(null);
  // Mute state
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);
  // Hero text carousel effect
  useEffect(() => {
    const heroTimeout = setTimeout(() => {
      setHeroIndex((prev) => (prev + 1) % heroTexts.length);
    }, 10000);
    return () => clearTimeout(heroTimeout);
  }, [heroIndex]);

  const handleArrowClick = () => {
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleMuteToggle = () => {
    setMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const handleConnectClick = () => {
    const connectSection = document.getElementById('connect-section');
    if (connectSection) {
      connectSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <main className=" min-h-screen w-full p-0 m-0">
        {/* Redesigned Hero Section */}
        <section className="w-full flex flex-col items-center justify-center pt-8 pb-8 px-2 sm:px-6 md:px-12">
          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 text-center leading-tight mb-4" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.01em' }}>
            <span className="text-blue-700">Innovating</span> the Future of <span className="text-blue-500">Packaging</span><br/>
            <span className="text-gray-700">with ATS</span>
          </h1>
          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-gray-700 text-center max-w-2xl mb-6">
            Advanced Tooling Systems UK Ltd delivers cutting-edge packaging machinery and automation solutions for every industry. Experience precision, reliability, and innovation with ATS Packaging.
          </p>
          {/* Down Arrow Button */}
          <button className="mb-6 rounded-full border border-gray-300 p-2 hover:bg-gray-100 transition-colors" aria-label="Scroll Down" onClick={handleArrowClick}>
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {/* Boxed Video - now full width */}
          <div ref={videoRef} className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full relative">
            <video
              ref={videoRef}
              src={atsVideo}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
              autoPlay
              loop
              playsInline
              muted={muted}
              poster=""
            />
            {/* Mute/Unmute Button */}
            <button
              onClick={handleMuteToggle}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-blue-700 rounded-full p-2 shadow transition-all z-10"
              aria-label={muted ? 'Unmute video' : 'Mute video'}
            >
              {muted ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l6 6m0-6l-6 6" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 8.25v7.5a.75.75 0 01-1.28.53l-3.22-3.22a.75.75 0 010-1.06l3.22-3.22a.75.75 0 011.28.53z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l6 6m0-6l-6 6" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 8.25v7.5a.75.75 0 01-1.28.53l-3.22-3.22a.75.75 0 010-1.06l3.22-3.22a.75.75 0 011.28.53z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12a7.5 7.5 0 01-7.5 7.5" />
                </svg>
              )}
            </button>
          </div>
        </section>
       
      </main>
 
      <div className="w-full">
        <Services/>
      </div>
      <div>
        <Sectors/>
      </div>
      {/* Content Sections */}
      <div className="w-full">
        <Why/>
      </div>
      <div>
      <Brands/>
     </div>
     
      <div id="connect-section" className="w-full">
        <Connect/>
      </div>
      
 
        
    </div>
  )
}

export default Home
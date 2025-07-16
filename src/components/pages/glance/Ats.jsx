import React, { useState } from 'react';
import ats1 from '../../../assets/ats1.png';
import ats2 from '../../../assets/ats2.png';
import ats3 from '../../../assets/ats3.png';
import ats4 from '../../../assets/ats4.png';
import ats5 from '../../../assets/ats5.png';

function Ats() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselImages = [ats1, ats2, ats3];

  // Carousel auto-slide every 3s
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div style={{ fontFamily: 'inherit', background: '#f8fafc', minHeight: '100vh' }}>
      {/* About Section */}
      <section style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '3rem 1rem' }}>
        {/* Carousel */}
        <div style={{ width: 400, height: 300, position: 'relative', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.10)' }}>
          {carouselImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`ATS ${idx + 2}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: carouselIndex === idx ? 1 : 0,
                transition: 'opacity 0.7s',
                zIndex: carouselIndex === idx ? 2 : 1,
              }}
            />
          ))}
          {/* Carousel dots */}
          <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
            {carouselImages.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCarouselIndex(idx)}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: carouselIndex === idx ? '#1a202c' : '#cbd5e1',
                  cursor: 'pointer',
                  border: '2px solid #fff',
                  boxShadow: carouselIndex === idx ? '0 0 0 2px #1a202c' : 'none',
                  transition: 'background 0.3s',
                }}
              />
            ))}
          </div>
        </div>
        {/* Static Image */}
        
        {/* About Text */}
        <div style={{ maxWidth: 500 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1a202c', marginBottom: '1rem' }}>Our Mission</h2>
          <p style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '1.2rem' }}>
            Our main goal is to keep our customers' operations running at peak productivity. We achieve this because of our experienced staff commitment in the areas of pre-sales engineering and after-sales service. We currently support many systems with extremely short response times.<br />
            <span style={{ color: '#2563eb', fontWeight: 600 }}>Worldwide around the clock.</span>
          </p>
        </div>
      </section>

      {/* Competence Section */}
      <section style={{ background: '#fff', padding: '2.5rem 1rem', borderRadius: '1.5rem', margin: '2rem auto', maxWidth: 1200, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1a202c', marginBottom: '2rem', textAlign: 'center' }}>Competence</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        <img src={ats5} alt="ATS 5" style={{ width: 400, height: 400, objectFit: 'cover', borderRadius: '1.25rem', boxShadow: '0 2px 16px rgba(0,0,0,0.10)' }} />
          <div style={{ flex: '1 1 220px', minWidth: 220, maxWidth: 320, background: '#f1f5f9', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontWeight: 600, color: '#2563eb', marginBottom: 8 }}>State-of-the-art Technology</h3>
            <p style={{ color: '#374151' }}>We deliver state-of-the-art technology and best quality – in every single machine or every complete line solution.</p>
          </div>
          <div style={{ flex: '1 1 220px', minWidth: 220, maxWidth: 320, background: '#f1f5f9', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontWeight: 600, color: '#2563eb', marginBottom: 8 }}>Customer Focus</h3>
            <p style={{ color: '#374151' }}>Our strong relationships with customers have given us the expertise to understand their needs well. This helps us offer the best solutions tailored to each customer. As a result, we're the leader in established markets and the first choice in new markets.</p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem 2rem', background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
        <img src={ats4} alt="ATS Hero" style={{ width: '320px', maxWidth: '90vw', borderRadius: '1.5rem', boxShadow: '0 4px 32px rgba(0,0,0,0.10)' }} />
        <div style={{ marginLeft: '2.5rem', maxWidth: 600 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a202c', marginBottom: '1rem' }}>Where Excellence meets Innovation</h1>
          <p style={{ fontSize: '1.25rem', color: '#374151', lineHeight: 1.6 }}>
            ATS has stood for cutting-edge technology with line integration expertise and high quality machines with excellent performance and maximum reliability in Filling, Capping, Packing and palletising.
          </p>
        </div>
      </section>





      {/* Corporate Culture Section */}
      <section style={{ background: '#f8fafc', padding: '2.5rem 1rem', maxWidth: 1200, margin: '2rem auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1a202c', marginBottom: '2rem', textAlign: 'center' }}>Corporate Culture</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          <div style={{ flex: '1 1 220px', minWidth: 220, maxWidth: 320, background: '#fff', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontWeight: 600, color: '#2563eb', marginBottom: 8 }}>Pragmatic & Solution-oriented</h3>
            <p style={{ color: '#374151' }}>We prioritize efficiency, designing what's necessary while striving for the best outcome.</p>
          </div>
          <div style={{ flex: '1 1 220px', minWidth: 220, maxWidth: 320, background: '#fff', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontWeight: 600, color: '#2563eb', marginBottom: 8 }}>Passionate</h3>
            <p style={{ color: '#374151' }}>Mechanical engineering is not just our profession, it's our passion.</p>
          </div>
          <div style={{ flex: '1 1 220px', minWidth: 220, maxWidth: 320, background: '#fff', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontWeight: 600, color: '#2563eb', marginBottom: 8 }}>Innovative</h3>
            <p style={{ color: '#374151' }}>We are constantly exploring new ideas and technologies to stay ahead and provide innovative solutions.</p>
          </div>
          <div style={{ flex: '1 1 220px', minWidth: 220, maxWidth: 320, background: '#fff', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontWeight: 600, color: '#2563eb', marginBottom: 8 }}>Excellence</h3>
            <p style={{ color: '#374151' }}>We aim for excellence, always setting high standards and working to exceed them.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ats;

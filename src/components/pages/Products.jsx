import React from 'react';
import { Link } from 'react-router-dom';
import { CardContainer } from '../ui/Carousel';
import i1 from '../../assets/i1.jpg';
import i3 from '../../assets/i3.png';
import i4 from '../../assets/i4.jpg';
import i5 from '../../assets/i5.jpg';
import i7 from '../../assets/i7.jpg';
import i8 from '../../assets/i8.jpg';
import i9 from '../../assets/i9.jpg';
import i10 from '../../assets/i10.jpg';
 
const slideData = [
  {
    title: 'Capping Machines',
    button: (
      <Link to="/capping-machines" className="mt-6 px-4 py-2 w-fit mx-auto sm:text-sm text-black bg-white h-12 border border-transparent text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        Explore
      </Link>
    ),
    src: i1,
  },
  {
    title: 'Bottle Unscramblers',
    button: 'Explore',
    src: i3,
  },
  {
    title: 'Pump & Trigger Feeding Systems',
    button: 'Explore',
    src: i4,
  },
  {
    title: 'Turnkey Filling Lines',
    button: 'Explore',
    src: i5,
  },
  {
    title: 'Bespoke Packaging Solutions',
    button: 'Explore',
    src: i7,
  },
  {
    title: 'Food & Beverage Lines (FBL)',
    button: 'Explore',
    src: i8,
  },
];
 
const sliderImages = [i1, i3, i4, i5, i7, i8, i9, i10];
 
function InfiniteSlider() {
  return (
    <div className="w-full overflow-hidden py-10 mt-24 bg-gradient-to-r from-gray-50 via-white to-gray-50">
      <div className="flex gap-8 animate-slide-infinite" style={{ minWidth: '200%' }}>
        {[...sliderImages, ...sliderImages].map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt="Capping Machine"
            className="h-40 w-auto rounded-xl shadow-md object-cover select-none pointer-events-none"
            draggable={false}
            loading="lazy"
          />
        ))}
      </div>
      <style>{`
        @keyframes slide-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slide-infinite {
          animation: slide-infinite 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
 
export default function Products() {
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <h1 className="text-4xl md:text-6xl font-sans font-semibold text-black mb-12 text-center font-sans tracking-tight">Products</h1>
      {/* Replace Carousel with CardContainer or your custom carousel logic */}
      <CardContainer>{/* TODO: Place your carousel slides here using CardBody/CardItem as needed */}</CardContainer>
      {/* Add margin below carousel before slider */}
      <div className="mb-24" />
      <InfiniteSlider />
    </div>
  );
}
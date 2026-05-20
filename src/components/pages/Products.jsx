import React from 'react';
import { Link } from 'react-router-dom';
import { CardContainer } from '../ui/Carousel';
import { useCmsPage } from '../../hooks/useCmsPage';
import i1 from '../../assets/i1.jpg';
import i3 from '../../assets/i3.png';
import i4 from '../../assets/i4.jpg';
import i5 from '../../assets/i5.jpg';
import i7 from '../../assets/i7.jpg';
import i8 from '../../assets/i8.jpg';
import i9 from '../../assets/i9.jpg';
import i10 from '../../assets/i10.jpg';

const sliderImages = [i1, i3, i4, i5, i7, i8, i9, i10];

function InfiniteSlider() {
  return (
    <div className="mt-12 w-full overflow-hidden bg-gradient-to-r from-gray-50 via-white to-gray-50 py-8 sm:mt-16 sm:py-10 lg:mt-20">
      <div className="flex min-w-[200%] animate-marquee gap-4 sm:gap-8">
        {[...sliderImages, ...sliderImages].map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt="Product showcase"
            className="h-28 w-auto shrink-0 rounded-xl object-cover shadow-md select-none sm:h-36 md:h-40"
            draggable={false}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

export default function Products() {
  const { content } = useCmsPage('products');
  return (
    <div className="relative w-full overflow-hidden">
      <div className="site-container py-10 sm:py-14 lg:py-16">
        <h1 className="page-title text-center font-semibold tracking-tight text-black">
          {content.pageTitle || 'Products'}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-gray-600 sm:text-base">
          Explore our range of packaging machinery and automation solutions.
        </p>
      </div>
      <div className="site-container overflow-x-hidden px-0 sm:px-[var(--site-padding-x)]">
        <CardContainer>{/* TODO: carousel slides */}</CardContainer>
      </div>
      <InfiniteSlider />
    </div>
  );
}

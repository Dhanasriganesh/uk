import React from 'react'
import news1 from '../../../assets/news.png'
import news2 from '../../../assets/news2.png'

function News() {
  return (
    <section className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-4 text-center">News</h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-10">
        Stay up to date with the latest developments, achievements, and updates from Advanced Tooling Systems UK Ltd. Explore our recent news and highlights below.
      </p>
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden">
          <img src={news1} alt="News 1" className="w-full h-80 object-cover object-center" />
        </div>
        <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden">
          <img src={news2} alt="News 2" className="w-full h-80 object-cover object-center" />
        </div>
      </div>
    </section>
  )
}

export default News

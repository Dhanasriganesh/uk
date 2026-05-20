import React from 'react'
import { useCmsPage } from '../../../hooks/useCmsPage'
import { CmsImage } from '../../cms/CmsMedia'
import news1 from '../../../assets/news.png'
import news2 from '../../../assets/news2.png'

const fallbacks = [news1, news2]

function News() {
  const { content } = useCmsPage('news')
  const articles = content.articles?.length ? content.articles : [{ title: 'News 1' }, { title: 'News 2' }]

  return (
    <section className="site-container section-py">
      <h1 className="page-title mb-3 text-center font-bold text-blue-800 sm:mb-4">{content.title || 'News'}</h1>
      <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-gray-700 sm:mb-10 sm:text-base lg:text-lg">
        {content.intro || 'Stay up to date with the latest developments from Advanced Tooling Systems UK Ltd.'}
      </p>
      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
        {articles.map((article, i) => (
          <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-lg">
            <CmsImage src={article.imageUrl} fallback={fallbacks[i]} alt={article.title} className="aspect-video w-full object-cover object-center sm:aspect-[16/10]" />
            {article.title && (
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{article.title}</h3>
                {article.date && <p className="text-sm text-gray-500">{article.date}</p>}
                {article.excerpt && <p className="mt-2 text-sm text-gray-600">{article.excerpt}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default News

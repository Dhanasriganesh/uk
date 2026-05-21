import React from 'react'
import { useCmsPage } from '../../../hooks/useCmsPage'
import { CmsImage } from '../../cms/CmsMedia'
import newsFeatured from '../../../assets/news.png'

const serif = { fontFamily: 'Playfair Display, serif' }

const DEFAULT_ARTICLE = {
  title: 'Boeing EnCore Clearly Ahead Award',
  date: '',
  imageUrl: '',
  body:
    'It is with great pleasure that we accept the Boeing EnCore Clearly Ahead award after many years of supporting both Boeing and EnCore with some of the largest and most visually impressive projects we\'ve delivered.\n\nHere\'s to many more years, supporting a company that make it so easy to go the extra mile for!\n\nPlease see the link below to our LinkedIn Post:',
  linkedInUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7437123987547189248',
  linkedInLabel: 'View on LinkedIn',
}

const DEFAULT_ARTICLES = [DEFAULT_ARTICLE]

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm15.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v5.62z" />
    </svg>
  )
}

function ArticleBody({ article }) {
  if (article.body) {
    return article.body
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((paragraph, i) => (
        <p key={i} className="text-base leading-[1.85] text-[#444444] sm:text-lg sm:leading-[1.9]">
          {paragraph}
        </p>
      ))
  }

  if (article.excerpt) {
    return (
      <p className="text-base leading-[1.85] text-[#444444] sm:text-lg">{article.excerpt}</p>
    )
  }

  return null
}

function NewsArticle({ article, imageFallback, featured }) {
  const hasLink = Boolean(article.linkedInUrl?.trim())

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-[#f1f1f1] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)] ${
        featured ? 'lg:flex lg:min-h-[320px]' : ''
      }`}
    >
      <div
        className={`relative shrink-0 bg-[#f8f8f8] ${
          featured ? 'lg:w-[42%]' : ''
        }`}
      >
        <CmsImage
          src={article.imageUrl}
          fallback={imageFallback}
          alt={article.title || 'News'}
          className={`w-full object-cover ${
            featured
              ? 'aspect-[16/10] lg:h-full lg:min-h-[280px] lg:aspect-auto'
              : 'aspect-[16/10]'
          }`}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:bg-gradient-to-r"
          aria-hidden
        />
      </div>

      <div className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 ${featured ? 'lg:flex-1' : ''}`}>
        {article.date && (
          <time
            dateTime={article.date}
            className="mb-3 inline-flex w-fit rounded-full bg-[#fef2f2] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#dc2626]"
          >
            {article.date}
          </time>
        )}

        {article.title && (
          <h2
            className="mb-4 text-xl font-bold leading-snug text-[#111111] sm:mb-5 sm:text-2xl lg:text-[1.75rem]"
            style={serif}
          >
            {article.title}
          </h2>
        )}

        <div className="space-y-4 sm:space-y-5">
          <ArticleBody article={article} />
        </div>

        {hasLink && (
          <div className="mt-6 border-t border-[#f1f1f1] pt-6 sm:mt-8 sm:pt-8">
            <a
              href={article.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-[10px] bg-[#0a66c2] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#004182] sm:text-base"
            >
              <LinkedInIcon />
              {article.linkedInLabel || 'View on LinkedIn'}
            </a>
          </div>
        )}
      </div>
    </article>
  )
}

function News() {
  const { content } = useCmsPage('news')

  const articles = content.articles?.length
    ? content.articles
    : DEFAULT_ARTICLES

  const showIntro = Boolean(content.intro?.trim())

  return (
    <div className="w-full bg-white">
      <section className="site-container section-py">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-14">
          <h1
            className="page-title font-bold tracking-tight text-black"
            style={serif}
          >
            {content.title || 'News'}
          </h1>
          {showIntro && (
            <p className="mt-4 text-base leading-relaxed text-[#5f5f5f] sm:mt-5 sm:text-lg">
              {content.intro}
            </p>
          )}
          <div className="mx-auto mt-5 h-[3px] w-16 rounded-full bg-[#dc2626] sm:mt-6 sm:w-20" aria-hidden />
        </header>

        <div className="mx-auto flex max-w-4xl flex-col gap-10 sm:gap-12">
          {articles.map((article, i) => (
            <NewsArticle
              key={`${article.title}-${i}`}
              article={article}
              imageFallback={newsFeatured}
              featured={i === 0 && articles.length === 1}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default News

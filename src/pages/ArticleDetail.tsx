import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react'
import { useArticle } from '@/hooks/useArticles'
import ReactMarkdown from 'react-markdown'
import { generateSlug } from '@/lib/slugUtils'

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: article, isLoading, error } = useArticle(slug || '')

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatReadTime = (minutes: number | null) => {
    if (!minutes) return '5 min read'
    return `${minutes} min read`
  }

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.subtitle || article.excerpt || 'Read this analysis on Carry & Conquer',
          url: window.location.href,
        })
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh] pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-white/70">Loading article...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return <Navigate to="/analysis" replace />
  }

  const articleUrl = `${window.location.origin}/analysis/${generateSlug(article.title)}`
  const imageUrl = article.image_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475'

  return (
    <>
      <Helmet>
        <title>{article.title} | Carry & Conquer Analysis</title>
        <meta name="description" content={article.excerpt || article.subtitle || `${article.title} - Market analysis and insights from Carry & Conquer`} />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt || article.subtitle || `${article.title} - Market analysis and insights from Carry & Conquer`} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Carry & Conquer" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt || article.subtitle || `${article.title} - Market analysis and insights from Carry & Conquer`} />
        <meta name="twitter:image" content={imageUrl} />
        
        {/* Article specific tags */}
        {article.author_name && <meta name="author" content={article.author_name} />}
        {article.published_date && <meta property="article:published_time" content={article.published_date} />}
        {article.category && <meta property="article:section" content={article.category} />}
        
        {/* Canonical URL */}
        <link rel="canonical" href={articleUrl} />
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-20">
          <div className="h-64 md:h-96 overflow-hidden">
            <img 
              src={imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-800">
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                {article.author_name && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{article.author_name}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.published_date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatReadTime(article.read_time)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="text-white/70 border-gray-700 hover:text-white hover:bg-gray-800"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.history.back()}
                  className="text-white/70 hover:text-white hover:bg-gray-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>
            </div>

            {/* Article Title */}
            <div className="mb-8">
              <Badge variant="secondary" className="mb-4 bg-green-500/20 text-green-300">
                {article.category}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                {article.title}
              </h1>
              {article.subtitle && (
                <p className="text-xl text-white/80 max-w-3xl">
                  {article.subtitle}
                </p>
              )}
            </div>

            {/* Article Body */}
            <div className="prose prose-invert prose-lg max-w-none text-white/90 leading-relaxed
                prose-headings:text-white prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
                prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-6 prose-h2:text-green-400
                prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-5 prose-h3:text-green-400
                prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-4
                prose-p:mb-4 prose-p:leading-relaxed
                prose-ul:mb-4 prose-li:mb-1
                prose-strong:text-white prose-strong:font-semibold
                prose-a:text-green-400 prose-a:hover:text-green-300">
              <ReactMarkdown
                components={{
                  h1: ({children}) => <h1 className="text-3xl font-bold text-white mb-6 mt-8">{children}</h1>,
                  h2: ({children}) => <h2 className="text-2xl font-bold text-green-400 mb-4 mt-6">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl font-bold text-green-400 mb-3 mt-5">{children}</h3>,
                  h4: ({children}) => <h4 className="text-lg font-bold text-white mb-2 mt-4">{children}</h4>,
                  p: ({children}) => <p className="mb-4 leading-relaxed text-white/90">{children}</p>,
                  ul: ({children}) => <ul className="mb-4 text-white/90">{children}</ul>,
                  li: ({children}) => <li className="mb-1 text-white/90">{children}</li>,
                  strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                  a: ({children, href}) => <a href={href} className="text-green-400 hover:text-green-300 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                }}
              >
                {article.content || 'No content available'}
              </ReactMarkdown>
            </div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  )
}
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, User, ArrowRight, FileText } from "lucide-react"
import { Link } from "react-router-dom"

interface FeaturedArticle {
  id: string
  title: string
  excerpt: string | null
  image_url: string | null
  slug: string | null
  author_name: string | null
  published_date: string | null
  category: string
  read_time: number | null
}

export function FeaturedArticles() {
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['featured-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .eq('featured', true)
        .order('featured_order', { ascending: true, nullsFirst: false })
        .order('published_date', { ascending: false })
        .limit(3)

      if (error) throw error
      return data as FeaturedArticle[]
    }
  })

  if (isLoading) {
    return (
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-800 rounded w-64 mx-auto"></div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 bg-gray-800 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (articles.length === 0) {
    return null
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'market-analysis': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'deal-intelligence': 'bg-green-500/20 text-green-400 border-green-500/30',
      'sector-insights': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'fundraising': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'exits': 'bg-red-500/20 text-red-400 border-red-500/30'
    }
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 h-full">
          {Array.from({ length: 64 }, (_, i) => (
            <div 
              key={i} 
              className="border border-green-500/20 animate-pulse"
              style={{ animationDelay: `${i * 0.05}s`, animationDuration: '3s' }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
            <FileText className="w-4 h-4 mr-2" />
            FEATURED INSIGHTS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Latest Market
            <span className="block text-green-400 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Stay ahead with our expert analysis and market insights
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card 
              key={article.id}
              className="group bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:border-green-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/10"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Article Image */}
              {article.image_url && (
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={article.image_url} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={getCategoryColor(article.category)}>
                      {article.category.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
              )}

              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors line-clamp-2">
                  {article.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Article Meta */}
                <div className="flex items-center text-sm text-white/60 space-x-4">
                  {article.author_name && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.author_name}
                    </div>
                  )}
                  {article.read_time && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.read_time} min
                    </div>
                  )}
                </div>

                {/* Excerpt */}
                {article.excerpt && (
                  <p className="text-white/70 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                )}

                {/* Date */}
                {article.published_date && (
                  <p className="text-xs text-white/50">
                    {formatDate(article.published_date)}
                  </p>
                )}

                {/* Read More Button */}
                <Link 
                  to={`/analysis${article.slug ? `#${article.slug}` : ''}`}
                  className="block"
                >
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between text-white/80 hover:text-white hover:bg-green-500/10 border border-gray-600/50 hover:border-green-500/30"
                  >
                    Read Full Analysis
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Articles CTA */}
        <div className="text-center mt-12">
          <Link to="/analysis">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-green-500/20 to-teal-500/20 hover:from-green-500/30 hover:to-teal-500/30 text-green-400 border border-green-500/30 hover:border-green-400/50 backdrop-blur-sm"
            >
              View All Market Analysis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
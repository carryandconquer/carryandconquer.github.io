import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, Target, Briefcase, Users, Newspaper, FileText, Clock, User } from 'lucide-react';
import { useArticles, useArticleCategories } from '@/hooks/useArticles'
import { generateSlug } from '@/lib/slugUtils';

export default function Analysis() {
  const [activeFilter, setActiveFilter] = useState<string>('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: articles = [], isLoading: articlesLoading, error: articlesError } = useArticles();
  const { data: categories = [], isLoading: categoriesLoading } = useArticleCategories();
  
  const loading = articlesLoading || categoriesLoading;
  const error = articlesError;

  const filteredArticles = useMemo(() => {
    let filtered = articles;
    
    // Filter by category
    if (activeFilter !== 'All Articles') {
      filtered = filtered.filter(article => article.category === activeFilter);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (article.author_name && article.author_name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  }, [articles, activeFilter, searchQuery]);

  const getCategoryCount = (category: string) => {
    if (category === 'All Articles') return articles.length;
    return articles.filter(article => article.category === category).length;
  };


  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'market trends': return TrendingUp;
      case 'key deals': return Target;
      case 'investment strategy': return Briefcase;
      case 'profiles': return Users;
      case 'news': return Newspaper;
      default: return FileText;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatReadTime = (minutes: number | null) => {
    if (!minutes) return '5 min read';
    return `${minutes} min read`;
  };

  const generateExcerpt = (content: string | null, maxLength: number = 150) => {
    if (!content) return 'No excerpt available';
    
    // Strip HTML tags and get plain text
    const textContent = content.replace(/<[^>]*>/g, '').trim();
    
    if (textContent.length <= maxLength) return textContent;
    
    // Find the last complete word within the limit
    const truncated = textContent.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    
    return lastSpaceIndex > 0 
      ? truncated.substring(0, lastSpaceIndex) + '...'
      : truncated + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh] pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-white/70">Loading articles...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh] pt-20">
          <div className="text-center">
            <p className="text-red-400 mb-4">Failed to load articles</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Market Analysis | Carry & Conquer</title>
        <meta name="description" content="Comprehensive market analysis, insights, and strategic intelligence for informed investment decisions. Stay ahead with our expert analysis and trends." />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Market Analysis | Carry & Conquer" />
        <meta property="og:description" content="Comprehensive market analysis, insights, and strategic intelligence for informed investment decisions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/analysis`} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Market Analysis | Carry & Conquer" />
        <meta name="twitter:description" content="Comprehensive market analysis, insights, and strategic intelligence for informed investment decisions." />
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Market Analysis
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Comprehensive insights, trends, and strategic intelligence for informed investment decisions
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 bg-gray-900/50 border-gray-700 text-white placeholder:text-white/60 focus:border-green-500 focus:ring-green-500/20"
            />
          </div>
        </div>
      </section>

      {/* Filter Navigation */}
      <section className="pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
            {[
              { label: 'All Articles', icon: FileText },
              ...categories.map(cat => ({ label: cat, icon: getCategoryIcon(cat) }))
            ].map((filter) => {
              const isActive = activeFilter === filter.label;
              const count = getCategoryCount(filter.label);
              const Icon = filter.icon;
              
              return (
                <Button
                  key={filter.label}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => setActiveFilter(filter.label)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                    ${isActive 
                      ? 'bg-green-500 text-black hover:bg-green-400' 
                      : 'text-white/70 hover:text-white hover:bg-gray-800/50 border border-gray-700'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{filter.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-black/20 text-black' : 'bg-gray-700 text-white/60'}`}>
                    {count}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link key={article.id} to={`/analysis/${generateSlug(article.title)}`}>
                  <Card 
                    className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-green-500/30 transition-all duration-300 cursor-pointer hover:-translate-y-1 group overflow-hidden h-full"
                  >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.image_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475'} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <Badge variant="secondary" className="absolute top-4 left-4 bg-green-500/20 text-green-300">
                      {article.category}
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white line-clamp-2">{article.title}</CardTitle>
                    {article.subtitle && (
                      <CardDescription className="text-white/60 line-clamp-1 mt-2">
                        {article.subtitle}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 mb-4 line-clamp-3">{generateExcerpt(article.content)}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-white/60">
                        <User className="h-4 w-4" />
                        <span>{article.author_name || 'Unknown Author'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Clock className="h-4 w-4" />
                        <span>{formatReadTime(article.read_time)}</span>
                      </div>
                    </div>
                  </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-white/60 text-lg mb-4">No articles found</div>
              <p className="text-white/40">
                {searchQuery 
                  ? `No articles match "${searchQuery}" in the ${activeFilter} category.`
                  : `No articles available in the ${activeFilter} category.`
                }
              </p>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('All Articles');
                }}
                className="mt-4 text-green-400 hover:text-green-300"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      </div>
    </>
  )
}
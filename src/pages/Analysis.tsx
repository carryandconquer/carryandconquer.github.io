import React, { useState, useMemo, useEffect } from 'react';
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Calendar, Clock, User, Search, TrendingUp, Target, Briefcase, Users, Newspaper, FileText } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  category: string;
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  author_name: string | null;
  published_date: string | null;
  read_time: number | null;
  content: string | null;
  image_url: string | null;
  published: boolean | null;
}

export default function Analysis() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch articles and categories from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch articles
        const { data: articlesData, error: articlesError } = await supabase
          .from('articles')
          .select('*')
          .eq('published', true)
          .order('published_date', { ascending: false });

        if (articlesError) throw articlesError;

        // Fetch unique categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('articles')
          .select('category')
          .eq('published', true)
          .not('category', 'is', null);

        if (categoriesError) throw categoriesError;

        const uniqueCategories = [...new Set(categoriesData.map(item => item.category))].filter(Boolean);
        
        setArticles(articlesData || []);
        setCategories(uniqueCategories);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
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
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6">
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
                <Card 
                  key={article.id}
                  className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-green-500/30 transition-all duration-300 cursor-pointer hover:-translate-y-1 group overflow-hidden"
                  onClick={() => openArticle(article)}
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

      {/* Article Modal */}
      <Dialog open={!!selectedArticle} onOpenChange={closeArticle}>
        <DialogContent className="max-w-5xl max-h-[90vh] bg-black border-gray-800 text-white overflow-y-auto">
          {selectedArticle && (
            <>
              {/* Hero Image */}
              <div className="relative h-64 md:h-80 -m-6 mb-6 overflow-hidden">
                <img 
                  src={selectedArticle.image_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475'} 
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge variant="secondary" className="mb-4 bg-green-500/20 text-green-300">
                    {selectedArticle.category}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                    {selectedArticle.title}
                  </h1>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeArticle}
                  className="absolute top-4 right-4 text-white hover:text-green-300 bg-black/20 hover:bg-black/40"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>
              
              <div className="px-6 pb-6">
                <div className="flex items-center gap-4 text-sm text-white/60 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{selectedArticle.author_name || 'Unknown Author'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(selectedArticle.published_date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{formatReadTime(selectedArticle.read_time)}</span>
                  </div>
                </div>
                <div 
                  className="prose prose-invert prose-lg max-w-none text-white/90 leading-relaxed
                    prose-headings:text-white prose-headings:font-bold
                    prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
                    prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-6
                    prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-5 prose-h3:text-green-400
                    prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-4
                    prose-p:mb-4 prose-p:leading-relaxed
                    prose-ul:mb-4 prose-li:mb-1
                    prose-strong:text-white prose-strong:font-semibold"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content || '<p>No content available</p>' }}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
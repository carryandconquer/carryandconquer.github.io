import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Building2, 
  MapPin, 
  Users, 
  Globe, 
  Mail, 
  Calendar,
  ExternalLink,
  ArrowLeft,
  Monitor,
  Zap,
  BarChart3,
  Cpu,
  Shield,
  TrendingUp
} from 'lucide-react'
import { useCompany } from '@/hooks/useCompanies'

// Placeholder data for companies not in database
const getPlaceholderCompany = (slug: string) => {
  if (slug === 'zenscreen') {
    return {
      id: 'zenscreen-placeholder',
      name: 'ZenScreen',
      slug: 'zenscreen',
      description: 'ZenScreen is a market-leading SaaS platform transforming how enterprises manage and deploy screens across multiple locations with AI-powered content optimization. Our cutting-edge technology enables businesses to seamlessly coordinate digital displays, optimize content delivery, and maximize audience engagement through intelligent automation and real-time analytics.',
      website: 'https://zenscreen.ai',
      logo_url: null,
      company_type: 'startup' as const,
      founded_date: '2019-03-15',
      employee_count: 85,
      industry_tags: [
        'Digital Signage',
        'AI/ML',
        'SaaS',
        'Enterprise Software',
        'Content Management',
        'Real-time Analytics',
        'IoT',
        'Computer Vision'
      ],
      city: 'San Francisco',
      country: 'United States',
      region: 'North America',
      social_links: {
        linkedin: 'https://linkedin.com/company/zenscreen',
        twitter: 'https://twitter.com/zenscreen',
        github: 'https://github.com/zenscreen'
      },
      contact_email: 'hello@zenscreen.ai',
      meta_description: 'ZenScreen - AI-powered digital signage platform for enterprise screen management',
      featured: true,
      published: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  }
  return null
}

const CompanyProfile = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data: company, isLoading, error } = useCompany(slug!)
  
  // Check for placeholder data if company not found in database
  const placeholderCompany = !company && !isLoading ? getPlaceholderCompany(slug!) : null
  const displayCompany = company || placeholderCompany

  if (isLoading) {
    return (
      <div className="min-h-screen font-primary pt-24 bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-48" />
            <div className="h-32 bg-muted rounded" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-64 bg-muted rounded" />
              <div className="h-64 bg-muted rounded" />
              <div className="h-64 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || (!company && !placeholderCompany)) {
    return (
      <div className="min-h-screen font-primary pt-24 bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Company Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The company you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/companies">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Companies
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen font-primary pt-24 bg-background">
      <Helmet>
        <title>{displayCompany.name} - Company Profile</title>
        <meta name="description" content={displayCompany.meta_description || displayCompany.description || `Learn more about ${displayCompany.name}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${displayCompany.name} - Company Profile`} />
        <meta property="og:description" content={displayCompany.meta_description || displayCompany.description || `Learn more about ${displayCompany.name}`} />
        <meta property="og:image" content={displayCompany.logo_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=630&fit=crop'} />
        <meta property="og:url" content={`${window.location.origin}/companies/${displayCompany.slug}`} />
        <meta property="og:site_name" content="Private Equity Directory" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${displayCompany.name} - Company Profile`} />
        <meta name="twitter:description" content={displayCompany.meta_description || displayCompany.description || `Learn more about ${displayCompany.name}`} />
        <meta name="twitter:image" content={displayCompany.logo_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=630&fit=crop'} />
        
        {/* Additional Meta Tags */}
        <meta name="author" content={displayCompany.name} />
        <meta name="keywords" content={`${displayCompany.name}, ${displayCompany.industry_tags?.join(', ') || ''}, ${displayCompany.company_type}`} />
        <link rel="canonical" href={`${window.location.origin}/companies/${displayCompany.slug}`} />
      </Helmet>
      
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Back Navigation */}
        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link to="/companies">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Companies
          </Link>
        </Button>

        {/* Header */}
        <div className="flex items-start gap-6 mb-8">
          {displayCompany.logo_url ? (
            <img 
              src={displayCompany.logo_url} 
              alt={`${displayCompany.name} logo`}
              className="w-20 h-20 rounded-xl object-contain bg-background border shadow-sm"
            />
          ) : (
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border shadow-sm">
              <Monitor className="w-10 h-10 text-white" />
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{displayCompany.name}</h1>
              <Badge variant="secondary">
                {displayCompany.company_type.charAt(0).toUpperCase() + displayCompany.company_type.slice(1)}
              </Badge>
              {displayCompany.featured && (
                <Badge variant="default">Featured</Badge>
              )}
              {placeholderCompany && (
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  Recently Invested
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
              {displayCompany.city && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{displayCompany.city}{displayCompany.country && `, ${displayCompany.country}`}</span>
                </div>
              )}
              
              {displayCompany.employee_count && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{displayCompany.employee_count.toLocaleString()} employees</span>
                </div>
              )}
              
              {displayCompany.founded_date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Founded {new Date(displayCompany.founded_date).getFullYear()}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {displayCompany.website && (
                <Button asChild>
                  <a href={displayCompany.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              )}
              
              {displayCompany.contact_email && (
                <Button variant="outline" asChild>
                  <a href={`mailto:${displayCompany.contact_email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* About */}
          <div className="lg:col-span-2 space-y-6">
            {displayCompany.description && (
              <Card>
                <CardHeader>
                  <CardTitle>About {displayCompany.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {displayCompany.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Key Features for ZenScreen */}
            {placeholderCompany && slug === 'zenscreen' && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Features & Capabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">AI-Powered Optimization</h3>
                        <p className="text-sm text-muted-foreground">Intelligent content delivery and audience engagement optimization</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <Monitor className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Multi-Location Management</h3>
                        <p className="text-sm text-muted-foreground">Centralized control of screens across multiple locations</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Real-time Analytics</h3>
                        <p className="text-sm text-muted-foreground">Comprehensive performance metrics and engagement insights</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                        <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Enterprise Security</h3>
                        <p className="text-sm text-muted-foreground">Enterprise-grade security with compliance standards</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Industry Tags */}
            {displayCompany.industry_tags && displayCompany.industry_tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Industries & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {displayCompany.industry_tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Metrics for ZenScreen */}
            {placeholderCompany && slug === 'zenscreen' && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">127%</div>
                      <div className="text-sm text-muted-foreground">Revenue Growth</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">94%</div>
                      <div className="text-sm text-muted-foreground">Customer Retention</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-1">500+</div>
                      <div className="text-sm text-muted-foreground">Enterprise Clients</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 mb-1">50k+</div>
                      <div className="text-sm text-muted-foreground">Screens Managed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Type</span>
                  <p className="text-sm">
                    {displayCompany.company_type.charAt(0).toUpperCase() + displayCompany.company_type.slice(1)}
                  </p>
                </div>
                
                {displayCompany.city && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Location</span>
                    <p className="text-sm">
                      {displayCompany.city}
                      {displayCompany.region && `, ${displayCompany.region}`}
                      {displayCompany.country && `, ${displayCompany.country}`}
                    </p>
                  </div>
                )}
                
                {displayCompany.founded_date && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Founded</span>
                    <p className="text-sm">
                      {new Date(displayCompany.founded_date).getFullYear()}
                    </p>
                  </div>
                )}
                
                {displayCompany.employee_count && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Size</span>
                    <p className="text-sm">
                      {displayCompany.employee_count.toLocaleString()} employees
                    </p>
                  </div>
                )}
                
                {placeholderCompany && slug === 'zenscreen' && (
                  <>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Funding Status</span>
                      <p className="text-sm flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        Recently Raised Series B
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Valuation</span>
                      <p className="text-sm">$150M (estimated)</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Recent Investment for ZenScreen */}
            {placeholderCompany && slug === 'zenscreen' && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Investment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Amount</span>
                      <span className="text-lg font-bold text-green-600">$35M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Round</span>
                      <span className="text-sm">Series B</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Date</span>
                      <span className="text-sm">October 2024</span>
                    </div>
                    <div className="pt-2 border-t">
                      <span className="text-sm font-medium text-muted-foreground">Lead Investor</span>
                      <p className="text-sm">Sequoia Capital</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Social Links */}
            {displayCompany.social_links && Object.keys(displayCompany.social_links).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Connect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(displayCompany.social_links).map(([platform, url]) => (
                    <Button 
                      key={platform} 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start" 
                      asChild
                    >
                      <a href={url as string} target="_blank" rel="noopener noreferrer">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </a>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CompanyProfile
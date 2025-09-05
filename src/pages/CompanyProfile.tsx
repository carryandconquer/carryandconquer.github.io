import { useParams, Link } from 'react-router-dom'
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 pt-32">
        {/* Back Navigation */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-8 text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300" 
          asChild
        >
          <Link to="/companies">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Companies
          </Link>
        </Button>

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            {displayCompany.logo_url ? (
              <img 
                src={displayCompany.logo_url} 
                alt={`${displayCompany.name} logo`}
                className="w-24 h-24 rounded-2xl object-contain bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Monitor className="w-12 h-12 text-white" />
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <h1 className="text-5xl font-bold text-white">{displayCompany.name}</h1>
              {displayCompany.featured && (
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-3 py-1">
                  Featured
                </Badge>
              )}
              {placeholderCompany && (
                <Badge className="bg-gradient-to-r from-orange-400 to-pink-500 text-white border-0 px-3 py-1">
                  Recently Invested
                </Badge>
              )}
            </div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {displayCompany.description}
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
              {displayCompany.city && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{displayCompany.city}, {displayCompany.country}</span>
                </div>
              )}
              
              {displayCompany.employee_count && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{displayCompany.employee_count.toLocaleString()} employees</span>
                </div>
              )}
              
              {displayCompany.founded_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Founded {new Date(displayCompany.founded_date).getFullYear()}</span>
                </div>
              )}
            </div>

            <div className="flex gap-4 justify-center mt-8">
              {displayCompany.website && (
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
                  asChild
                >
                  <a href={displayCompany.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Website
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              )}
              
              {displayCompany.contact_email && (
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-gray-800/80 backdrop-blur-sm border-gray-600/50 text-white hover:bg-gray-700/80 shadow-lg"
                  asChild
                >
                  <a href={`mailto:${displayCompany.contact_email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Get in Touch
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Performance Metrics for ZenScreen */}
        {placeholderCompany && slug === 'zenscreen' && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">127%</div>
                  <div className="text-gray-300">Revenue Growth</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                    <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">94%</div>
                  <div className="text-gray-300">Customer Retention</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
                  <div className="text-gray-300">Enterprise Clients</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                    <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold text-orange-400 mb-2">50k+</div>
                  <div className="text-gray-300">Screens Managed</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                    <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full" style={{width: '90%'}}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Key Features for ZenScreen */}
          {placeholderCompany && slug === 'zenscreen' && (
            <div className="lg:col-span-2">
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 shadow-xl h-full">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Zap className="w-6 h-6 text-blue-400" />
                    Key Features & Capabilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                          <Cpu className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">AI-Powered Optimization</h3>
                          <p className="text-sm text-gray-400">Intelligent content delivery and audience engagement</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-500/20 rounded-xl border border-green-500/30">
                          <Monitor className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">Multi-Location Management</h3>
                          <p className="text-sm text-gray-400">Centralized control across multiple locations</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
                          <BarChart3 className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">Real-time Analytics</h3>
                          <p className="text-sm text-gray-400">Comprehensive performance metrics and insights</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-orange-500/20 rounded-xl border border-orange-500/30">
                          <Shield className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">Enterprise Security</h3>
                          <p className="text-sm text-gray-400">Enterprise-grade security with compliance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Investment for ZenScreen */}
            {placeholderCompany && slug === 'zenscreen' && (
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Recent Investment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700/50">
                      <div className="text-3xl font-bold text-green-400 mb-1">$35M</div>
                      <div className="text-sm text-gray-300">Series B Round</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Date</span>
                        <span className="font-medium text-white">October 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Lead Investor</span>
                        <span className="font-medium text-white">Sequoia Capital</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Valuation</span>
                        <span className="font-medium text-white">$150M</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Company Information */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-white">Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-400">Type</span>
                  <p className="font-medium text-white">
                    {displayCompany.company_type.charAt(0).toUpperCase() + displayCompany.company_type.slice(1)}
                  </p>
                </div>
                
                {displayCompany.city && (
                  <div>
                    <span className="text-sm font-medium text-gray-400">Location</span>
                    <p className="font-medium text-white">
                      {displayCompany.city}, {displayCompany.country}
                    </p>
                  </div>
                )}
                
                {displayCompany.founded_date && (
                  <div>
                    <span className="text-sm font-medium text-gray-400">Founded</span>
                    <p className="font-medium text-white">
                      {new Date(displayCompany.founded_date).getFullYear()}
                    </p>
                  </div>
                )}
                
                {displayCompany.employee_count && (
                  <div>
                    <span className="text-sm font-medium text-gray-400">Team Size</span>
                    <p className="font-medium text-white">
                      {displayCompany.employee_count.toLocaleString()} employees
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Social Links */}
            {displayCompany.social_links && Object.keys(displayCompany.social_links).length > 0 && (
              <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white">Connect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(displayCompany.social_links).map(([platform, url]) => (
                    <Button 
                      key={platform} 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between hover:bg-gray-800/50 text-gray-300 hover:text-white" 
                      asChild
                    >
                      <a href={url as string} target="_blank" rel="noopener noreferrer">
                        <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Industry Tags */}
        {displayCompany.industry_tags && displayCompany.industry_tags.length > 0 && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Industries & Expertise</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {displayCompany.industry_tags.map((tag) => (
                <Badge 
                  key={tag} 
                  className="bg-gray-800/50 text-gray-300 border-gray-600/50 hover:bg-gray-700/50 px-4 py-2 text-sm backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default CompanyProfile
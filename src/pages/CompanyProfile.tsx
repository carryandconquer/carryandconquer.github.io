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

import { getPlaceholderCompany } from '@/data/placeholderCompanies'

const CompanyProfile = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data: company, isLoading, error } = useCompany(slug!)
  
  // Check for placeholder data if company not found in database
  const placeholderCompany = !company && !isLoading ? getPlaceholderCompany(slug!) : null
  
  // Check for automotive companies from snapshot data
  const getAutomotiveCompany = (slug: string) => {
    const automotiveCompanies = {
      'robert-bosch-gmbh': {
        id: 'robert-bosch',
        name: 'Robert Bosch GmbH',
        slug: 'robert-bosch-gmbh',
        description: 'A leading global supplier of technology and services, divided into four business sectors: Mobility Solutions, Industrial Technology, Consumer Goods, and Energy and Building Technology. It is the world\'s largest automotive supplier.',
        website: 'https://www.bosch.com/',
        logo_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&h=300',
        company_type: 'automotive-supplier',
        founded_date: '1886-01-01',
        employee_count: 418000,
        industry_tags: ['Automotive', 'Industrial Technology', 'Consumer Goods', 'Energy and Building Technology'],
        city: 'Gerlingen',
        country: 'Germany',
        region: 'Europe',
        social_links: { linkedin: 'https://www.linkedin.com/company/bosch/' },
        contact_email: 'info@bosch.com',
        meta_description: 'World\'s largest automotive supplier with roughly 418,000 associates worldwide, leading innovation in mobility solutions.',
        featured: true,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      'denso-corporation': {
        id: 'denso-corp',
        name: 'DENSO CORPORATION',
        slug: 'denso-corporation',
        description: 'A global manufacturer of automotive components offering advanced automotive technologies, systems and products. Focuses on advanced mobility that positively changes how the world moves and contributes to greater well-being.',
        website: 'https://www.denso.com/global/en/',
        logo_url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&w=400&h=300',
        company_type: 'automotive-components',
        founded_date: '1949-12-16',
        employee_count: 168000,
        industry_tags: ['Automotive Components', 'Systems', 'Technology', 'Advanced Mobility'],
        city: 'Kariya',
        country: 'Japan',
        region: 'Asia Pacific',
        social_links: { linkedin: 'https://www.linkedin.com/company/denso-corporation/' },
        contact_email: 'info@denso.com',
        meta_description: 'Global manufacturer of automotive components with approximately 168,000 employees, focusing on advanced mobility technologies.',
        featured: true,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      'continental-ag': {
        id: 'continental',
        name: 'Continental AG',
        slug: 'continental-ag',
        description: 'A German multinational automotive parts manufacturing company specializing in brake systems, interior electronics, automotive safety, powertrain and chassis components, tires, and other parts for the automotive and transport industries.',
        website: 'https://www.continental.com/',
        logo_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400&h=300',
        company_type: 'automotive-parts',
        founded_date: '1871-01-01',
        employee_count: 200000,
        industry_tags: ['Automotive Parts Manufacturing', 'Tires', 'Industrial Products', 'Safety Systems'],
        city: 'Hanover',
        country: 'Germany',
        region: 'Europe',
        social_links: { linkedin: 'https://www.linkedin.com/company/continental/' },
        contact_email: 'info@continental.com',
        meta_description: 'German multinational automotive parts manufacturer with approximately 200,000 employees, specializing in brake systems and safety technology.',
        featured: true,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      'zf-friedrichshafen-ag': {
        id: 'zf-friedrichshafen',
        name: 'ZF Friedrichshafen AG',
        slug: 'zf-friedrichshafen-ag',
        description: 'A global technology company supplying systems for passenger cars, commercial vehicles and industrial technology, enabling the next generation of mobility. It is a leading worldwide automotive supplier for driveline and chassis technology.',
        website: 'https://www.zf.com/',
        logo_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&h=300',
        company_type: 'automotive-technology',
        founded_date: '1915-01-01',
        employee_count: 168738,
        industry_tags: ['Automotive Components', 'Driveline Technology', 'Chassis Technology', 'Industrial Technology'],
        city: 'Friedrichshafen',
        country: 'Germany',
        region: 'Europe',
        social_links: { linkedin: 'https://www.linkedin.com/company/zf-group/' },
        contact_email: 'info@zf.com',
        meta_description: 'Global technology company with approximately 168,738 employees, leading supplier for driveline and chassis technology.',
        featured: true,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      'magna-international': {
        id: 'magna-intl',
        name: 'Magna International Inc.',
        slug: 'magna-international',
        description: 'A leading global automotive supplier with manufacturing facilities and product development, engineering and sales centers in 28 countries. It is a mobility technology company built to innovate.',
        website: 'https://www.magna.com/',
        logo_url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&h=300',
        company_type: 'mobility-technology',
        founded_date: '1957-01-01',
        employee_count: 164000,
        industry_tags: ['Automotive Parts Manufacturing', 'Mobility Technology', 'Manufacturing', 'Innovation'],
        city: 'Aurora',
        country: 'Canada',
        region: 'North America',
        social_links: { linkedin: 'https://www.linkedin.com/company/magna-international/' },
        contact_email: 'info@magna.com',
        meta_description: 'Leading global automotive supplier with approximately 164,000 employees across 28 countries, driving mobility technology innovation.',
        featured: true,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      'hyundai-mobis-co-ltd': {
        id: 'hyundai-mobis',
        name: 'Hyundai Mobis Co., Ltd.',
        slug: 'hyundai-mobis-co-ltd',
        description: 'A manufacturer and marketer of automotive parts and modules. It is the "parts and service" arm for Hyundai Motor Company, Genesis Motors and Kia Motors, focusing on autonomous driving, connectivity and electrification.',
        website: 'https://www.mobis.com/en/',
        logo_url: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?auto=format&fit=crop&w=400&h=300',
        company_type: 'automotive-modules',
        founded_date: '1977-01-01',
        employee_count: 33702,
        industry_tags: ['Automotive Parts Manufacturing', 'Automotive Modules', 'Aftermarket Parts', 'Autonomous Driving'],
        city: 'Seoul',
        country: 'South Korea',
        region: 'Asia Pacific',
        social_links: { linkedin: 'https://www.linkedin.com/company/hyundai-mobis/' },
        contact_email: 'info@mobis.com',
        meta_description: 'Manufacturer of automotive parts and modules with approximately 33,702 employees, focusing on autonomous driving and electrification.',
        featured: true,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }
    return automotiveCompanies[slug] || null
  }
  
  const automotiveCompany = !company && !isLoading ? getAutomotiveCompany(slug!) : null
  const displayCompany = company || automotiveCompany || placeholderCompany

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

  if (error || (!company && !automotiveCompany && !placeholderCompany)) {
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
            <Link to="/snapshot">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Snapshot
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
          <Link to="/snapshot">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Snapshot
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
              {(placeholderCompany || automotiveCompany) && (
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  {automotiveCompany ? 'Trending Company' : 'Recently Invested'}
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

            {/* Key Features for Automotive Companies */}
            {automotiveCompany && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Business Areas & Capabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {slug === 'robert-bosch-gmbh' && (
                      <>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Mobility Solutions</h3>
                            <p className="text-sm text-muted-foreground">World's largest automotive supplier with comprehensive mobility technologies</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                            <Monitor className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Industrial Technology</h3>
                            <p className="text-sm text-muted-foreground">Advanced industrial automation and IoT solutions</p>
                          </div>
                        </div>
                      </>
                    )}
                    {slug === 'denso-corporation' && (
                      <>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Advanced Automotive Technologies</h3>
                            <p className="text-sm text-muted-foreground">Cutting-edge automotive systems and component technologies</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                            <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Electrification Solutions</h3>
                            <p className="text-sm text-muted-foreground">Next-generation mobility and electrification technologies</p>
                          </div>
                        </div>
                      </>
                    )}
                    {(slug === 'continental-ag' || slug === 'zf-friedrichshafen-ag' || slug === 'magna-international' || slug === 'hyundai-mobis-co-ltd') && (
                      <>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                            <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Global Manufacturing</h3>
                            <p className="text-sm text-muted-foreground">Worldwide manufacturing and supply chain operations</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                            <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Safety & Innovation</h3>
                            <p className="text-sm text-muted-foreground">Advanced safety systems and automotive innovation</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
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

            {/* Recent Metrics for Automotive Companies */}
            {automotiveCompany && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Performance Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {slug === 'robert-bosch-gmbh' && (
                      <>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-1">418K+</div>
                          <div className="text-sm text-muted-foreground">Global Employees</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 mb-1">#1</div>
                          <div className="text-sm text-muted-foreground">Auto Supplier</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600 mb-1">60+</div>
                          <div className="text-sm text-muted-foreground">Countries</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600 mb-1">4</div>
                          <div className="text-sm text-muted-foreground">Business Sectors</div>
                        </div>
                      </>
                    )}
                    {slug === 'denso-corporation' && (
                      <>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-1">168K+</div>
                          <div className="text-sm text-muted-foreground">Employees</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 mb-1">35+</div>
                          <div className="text-sm text-muted-foreground">Countries</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600 mb-1">200+</div>
                          <div className="text-sm text-muted-foreground">Locations</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600 mb-1">1949</div>
                          <div className="text-sm text-muted-foreground">Founded</div>
                        </div>
                      </>
                    )}
                    {(slug === 'continental-ag' || slug === 'zf-friedrichshafen-ag' || slug === 'magna-international' || slug === 'hyundai-mobis-co-ltd') && (
                      <>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-1">{displayCompany.employee_count ? Math.round(displayCompany.employee_count / 1000) + 'K+' : 'N/A'}</div>
                          <div className="text-sm text-muted-foreground">Employees</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 mb-1">Global</div>
                          <div className="text-sm text-muted-foreground">Presence</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600 mb-1">Leading</div>
                          <div className="text-sm text-muted-foreground">Technology</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600 mb-1">Innovation</div>
                          <div className="text-sm text-muted-foreground">Focus</div>
                        </div>
                      </>
                    )}
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
                
                {automotiveCompany && (
                  <>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Industry Focus</span>
                      <p className="text-sm flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        Automotive Technology
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Market Position</span>
                      <p className="text-sm">Industry Leader</p>
                    </div>
                  </>
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
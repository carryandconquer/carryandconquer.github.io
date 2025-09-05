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
  ArrowLeft
} from 'lucide-react'
import { useCompany } from '@/hooks/useCompanies'

const CompanyProfile = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data: company, isLoading, error } = useCompany(slug!)

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

  if (error || !company) {
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
          {company.logo_url ? (
            <img 
              src={company.logo_url} 
              alt={`${company.name} logo`}
              className="w-20 h-20 rounded-xl object-contain bg-background border shadow-sm"
            />
          ) : (
            <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center border shadow-sm">
              <Building2 className="w-10 h-10 text-muted-foreground" />
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{company.name}</h1>
              <Badge variant="secondary">
                {company.company_type.charAt(0).toUpperCase() + company.company_type.slice(1)}
              </Badge>
              {company.featured && (
                <Badge variant="default">Featured</Badge>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
              {company.city && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{company.city}{company.country && `, ${company.country}`}</span>
                </div>
              )}
              
              {company.employee_count && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{company.employee_count.toLocaleString()} employees</span>
                </div>
              )}
              
              {company.founded_date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Founded {new Date(company.founded_date).getFullYear()}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {company.website && (
                <Button asChild>
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              )}
              
              {company.contact_email && (
                <Button variant="outline" asChild>
                  <a href={`mailto:${company.contact_email}`}>
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
            {company.description && (
              <Card>
                <CardHeader>
                  <CardTitle>About {company.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {company.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Industry Tags */}
            {company.industry_tags && company.industry_tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Industries & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {company.industry_tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
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
                    {company.company_type.charAt(0).toUpperCase() + company.company_type.slice(1)}
                  </p>
                </div>
                
                {company.city && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Location</span>
                    <p className="text-sm">
                      {company.city}
                      {company.region && `, ${company.region}`}
                      {company.country && `, ${company.country}`}
                    </p>
                  </div>
                )}
                
                {company.founded_date && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Founded</span>
                    <p className="text-sm">
                      {new Date(company.founded_date).getFullYear()}
                    </p>
                  </div>
                )}
                
                {company.employee_count && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Size</span>
                    <p className="text-sm">
                      {company.employee_count.toLocaleString()} employees
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Social Links */}
            {company.social_links && Object.keys(company.social_links).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Connect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(company.social_links).map(([platform, url]) => (
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
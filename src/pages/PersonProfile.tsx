import { useParams, Link } from 'react-router-dom'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  User, 
  MapPin, 
  Building2, 
  Mail, 
  Linkedin,
  Twitter,
  ExternalLink,
  ArrowLeft
} from 'lucide-react'
import { usePerson } from '@/hooks/usePeople'
import { getPlaceholderPerson } from '@/data/placeholderPeople'

const PersonProfile = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data: person, isLoading, error } = usePerson(slug!)
  
  // Check for placeholder data if person not found in database
  const placeholderPerson = !person && !isLoading ? getPlaceholderPerson(slug!) : null
  const displayPerson = person || placeholderPerson

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

  if (error || (!person && !placeholderPerson)) {
    return (
      <div className="min-h-screen font-primary pt-24 bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Person Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The person you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/people">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to People
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
          <Link to="/people">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to People
          </Link>
        </Button>

        {/* Header */}
        <div className="flex items-start gap-6 mb-8">
          {displayPerson.profile_image_url ? (
            <img 
              src={displayPerson.profile_image_url} 
              alt={`${displayPerson.full_name} profile`}
              className="w-24 h-24 rounded-full object-cover shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center shadow-lg">
              <User className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{displayPerson.full_name}</h1>
              {displayPerson.featured && (
                <Badge variant="default">Featured</Badge>
              )}
              {placeholderPerson && (
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  Industry Expert
                </Badge>
              )}
            </div>
            
            {displayPerson.title && (
              <p className="text-lg text-muted-foreground mb-4">{displayPerson.title}</p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
              {displayPerson.company && (
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  <Link 
                    to={`/company/${displayPerson.company.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {displayPerson.company.name}
                  </Link>
                </div>
              )}
              
              {displayPerson.city && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{displayPerson.city}{displayPerson.country && `, ${displayPerson.country}`}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {displayPerson.linkedin_url && (
                <Button asChild>
                  <a href={displayPerson.linkedin_url} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              )}
              
              {displayPerson.twitter_url && (
                <Button variant="outline" asChild>
                  <a href={displayPerson.twitter_url} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              )}
              
              {displayPerson.contact_email && (
                <Button variant="outline" asChild>
                  <a href={`mailto:${displayPerson.contact_email}`}>
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
            {displayPerson.bio && (
              <Card>
                <CardHeader>
                  <CardTitle>About {displayPerson.full_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {displayPerson.bio}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Expertise */}
            {displayPerson.expertise_tags && displayPerson.expertise_tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Expertise & Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {displayPerson.expertise_tags.map((tag) => (
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
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Full Name</span>
                  <p className="text-sm">{displayPerson.full_name}</p>
                </div>
                
                {displayPerson.title && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Title</span>
                    <p className="text-sm">{displayPerson.title}</p>
                  </div>
                )}
                
                {displayPerson.company && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Company</span>
                    <Link 
                      to={`/company/${displayPerson.company.slug}`}
                      className="text-sm hover:text-primary transition-colors block"
                    >
                      {displayPerson.company.name}
                    </Link>
                  </div>
                )}
                
                {displayPerson.city && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Location</span>
                    <p className="text-sm">
                      {displayPerson.city}
                      {displayPerson.region && `, ${displayPerson.region}`}
                      {displayPerson.country && `, ${displayPerson.country}`}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Connect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {displayPerson.linkedin_url && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start" 
                    asChild
                  >
                    <a href={displayPerson.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                      <ExternalLink className="w-3 h-3 ml-auto" />
                    </a>
                  </Button>
                )}
                
                {displayPerson.twitter_url && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start" 
                    asChild
                  >
                    <a href={displayPerson.twitter_url} target="_blank" rel="noopener noreferrer">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                      <ExternalLink className="w-3 h-3 ml-auto" />
                    </a>
                  </Button>
                )}
                
                {displayPerson.contact_email && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start" 
                    asChild
                  >
                    <a href={`mailto:${displayPerson.contact_email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </a>
                  </Button>
                )}

                {/* Additional social links from social_links JSON */}
                {displayPerson.social_links && Object.entries(displayPerson.social_links).map(([platform, url]) => (
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PersonProfile
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, MapPin, Building2, Linkedin, Twitter } from 'lucide-react'
import type { Person } from '@/hooks/usePeople'

interface PersonCardProps {
  person: Person
}

export function PersonCard({ person }: PersonCardProps) {
  return (
    <Link to={`/person/${person.slug}`}>
      <Card className="group hover:shadow-lg transition-all duration-200 border-border/40 bg-background/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            {person.profile_image_url ? (
              <img 
                src={person.profile_image_url} 
                alt={`${person.full_name} profile`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {person.full_name}
              </h3>
              {person.title && (
                <p className="text-sm text-muted-foreground mt-1">
                  {person.title}
                </p>
              )}
              <div className="flex gap-1 mt-2">
                {person.featured && (
                  <Badge variant="default" className="text-xs">
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {person.bio && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {person.bio}
            </p>
          )}
          
          <div className="space-y-2">
            {person.company && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Building2 className="w-3 h-3" />
                <span>{person.company.name}</span>
              </div>
            )}
            
            {person.city && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{person.city}{person.country && `, ${person.country}`}</span>
              </div>
            )}
          </div>

          {person.expertise_tags && person.expertise_tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {person.expertise_tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {person.expertise_tags.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{person.expertise_tags.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="flex gap-2">
            {person.linkedin_url && (
              <div className="w-5 h-5 flex items-center justify-center rounded bg-primary/10">
                <Linkedin className="w-3 h-3 text-primary" />
              </div>
            )}
            {person.twitter_url && (
              <div className="w-5 h-5 flex items-center justify-center rounded bg-primary/10">
                <Twitter className="w-3 h-3 text-primary" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
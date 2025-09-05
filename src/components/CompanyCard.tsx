import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, MapPin, Users, Globe } from 'lucide-react'
import type { Company } from '@/hooks/useCompanies'

interface CompanyCardProps {
  company: Company
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link to={`/company/${company.slug}`}>
      <Card className="group hover:shadow-lg transition-all duration-200 border-border/40 bg-background/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            {company.logo_url ? (
              <img 
                src={company.logo_url} 
                alt={`${company.name} logo`}
                className="w-12 h-12 rounded-lg object-contain bg-background border"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <Building2 className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {company.name}
              </CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Badge variant="secondary" className="text-xs">
                  {company.company_type.charAt(0).toUpperCase() + company.company_type.slice(1)}
                </Badge>
                {company.featured && (
                  <Badge variant="default" className="text-xs">
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {company.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {company.description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            {company.city && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{company.city}{company.country && `, ${company.country}`}</span>
              </div>
            )}
            
            {company.employee_count && (
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{company.employee_count.toLocaleString()} employees</span>
              </div>
            )}
            
            {company.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>Website</span>
              </div>
            )}
          </div>

          {company.industry_tags && company.industry_tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {company.industry_tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {company.industry_tags.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{company.industry_tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
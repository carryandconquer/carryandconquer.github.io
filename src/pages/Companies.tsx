import { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { CompanyCard } from '@/components/CompanyCard'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, Building2 } from 'lucide-react'
import { useCompanies } from '@/hooks/useCompanies'

const companyTypes = [
  { value: '', label: 'All Types' },
  { value: 'startup', label: 'Startup' },
  { value: 'investor', label: 'Investor' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'service_provider', label: 'Service Provider' }
]

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const { data: companies = [], isLoading, error } = useCompanies(searchQuery, selectedType)

  const featuredCompanies = companies.filter(company => company.featured)
  const regularCompanies = companies.filter(company => !company.featured)

  return (
    <div className="min-h-screen font-primary pt-24 bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Companies Directory
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover innovative companies, investors, and service providers in our comprehensive directory
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Company Type" />
            </SelectTrigger>
            <SelectContent>
              {companyTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              {isLoading ? 'Loading...' : `${companies.length} companies found`}
            </span>
          </div>
          
          {(searchQuery || selectedType) && (
            <div className="flex gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
              {selectedType && (
                <Badge variant="secondary" className="gap-1">
                  Type: {companyTypes.find(t => t.value === selectedType)?.label}
                  <button onClick={() => setSelectedType('')} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load companies. Please try again.</p>
          </div>
        )}

        {/* Featured Companies */}
        {!isLoading && featuredCompanies.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-primary rounded-full"></span>
              Featured Companies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </section>
        )}

        {/* Regular Companies */}
        {!isLoading && regularCompanies.length > 0 && (
          <section>
            {featuredCompanies.length > 0 && (
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-secondary rounded-full"></span>
                All Companies
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!isLoading && companies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No companies found</h3>
            <p className="text-muted-foreground">
              {searchQuery || selectedType 
                ? 'Try adjusting your search criteria'
                : 'No companies have been added yet'
              }
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Companies
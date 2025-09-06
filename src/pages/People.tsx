import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { PersonCard } from '@/components/PersonCard'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Users } from 'lucide-react'
import { usePeople } from '@/hooks/usePeople'

const People = () => {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  
  // Initialize search query from URL parameters
  useEffect(() => {
    const urlSearch = searchParams.get('search')
    if (urlSearch) {
      setSearchQuery(urlSearch)
    }
  }, [searchParams])
  
  const { data: people = [], isLoading, error } = usePeople(searchQuery)

  const featuredPeople = people.filter(person => person.featured)
  const regularPeople = people.filter(person => !person.featured)

  return (
    <div className="min-h-screen font-primary pt-24 bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            People Directory
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with industry leaders, entrepreneurs, and professionals in our network
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              {isLoading ? 'Loading...' : `${people.length} people found`}
            </span>
          </div>
          
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-72 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load people. Please try again.</p>
          </div>
        )}

        {/* Featured People */}
        {!isLoading && featuredPeople.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-primary rounded-full"></span>
              Featured People
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPeople.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          </section>
        )}

        {/* Regular People */}
        {!isLoading && regularPeople.length > 0 && (
          <section>
            {featuredPeople.length > 0 && (
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-secondary rounded-full"></span>
                All People
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPeople.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!isLoading && people.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No people found</h3>
            <p className="text-muted-foreground">
              {searchQuery 
                ? 'Try adjusting your search criteria'
                : 'No people have been added yet'
              }
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default People
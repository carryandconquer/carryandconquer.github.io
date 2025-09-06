import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Building2, User, Search } from 'lucide-react'
import { useSearch } from '@/hooks/useSearch'

interface SearchCommandProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { data: results = [], isLoading } = useSearch(query)

  const handleSelect = useCallback((result: any) => {
    onOpenChange(false)
    setQuery('')
    
    if (result.type === 'person') {
      navigate(`/people/${result.slug}`)
    } else {
      navigate(`/companies/${result.slug}`)
    }
  }, [navigate, onOpenChange])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search people and companies..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6">
              <Search className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                {query.trim() ? 'No results found.' : 'Start typing to search...'}
              </p>
            </div>
          )}
        </CommandEmpty>

        {results.length > 0 && (
          <>
            {/* People Results */}
            {results.filter(r => r.type === 'person').length > 0 && (
              <CommandGroup heading="People">
                {results
                  .filter(r => r.type === 'person')
                  .map((result) => (
                    <CommandItem
                      key={result.id}
                      value={`${result.title}-${result.type}`}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center gap-3 p-3 cursor-pointer"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={result.image_url} 
                          alt={result.title}
                        />
                        <AvatarFallback className="bg-gradient-primary text-white text-xs">
                          {getInitials(result.title)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {result.title}
                        </p>
                        {result.subtitle && (
                          <p className="text-xs text-muted-foreground truncate">
                            {result.subtitle}
                          </p>
                        )}
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        <User className="h-3 w-3 mr-1" />
                        Person
                      </Badge>
                    </CommandItem>
                  ))}
              </CommandGroup>
            )}

            {/* Company Results */}
            {results.filter(r => r.type === 'company').length > 0 && (
              <CommandGroup heading="Companies">
                {results
                  .filter(r => r.type === 'company')
                  .map((result) => (
                    <CommandItem
                      key={result.id}
                      value={`${result.title}-${result.type}`}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center gap-3 p-3 cursor-pointer"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={result.image_url} 
                          alt={result.title}
                        />
                        <AvatarFallback className="bg-gradient-accent text-white text-xs">
                          <Building2 className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {result.title}
                        </p>
                        {result.subtitle && (
                          <p className="text-xs text-muted-foreground truncate">
                            {result.subtitle}
                          </p>
                        )}
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        <Building2 className="h-3 w-3 mr-1" />
                        Company
                      </Badge>
                    </CommandItem>
                  ))}
              </CommandGroup>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  )
}
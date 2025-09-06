import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import type { Person } from './usePeople'
import type { Company } from './useCompanies'

export interface SearchResult {
  id: string
  type: 'person' | 'company'
  title: string
  subtitle?: string
  image_url?: string
  slug: string
}

export const useSearch = (query: string, limit: number = 8) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  // Debounce search query to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 150)

    return () => clearTimeout(timer)
  }, [query])

  return useQuery({
    queryKey: ['search', debouncedQuery, limit],
    queryFn: async (): Promise<SearchResult[]> => {
      if (!debouncedQuery.trim()) return []

      const searchTerm = `%${debouncedQuery}%`

      // Search people
      const { data: people } = await supabase
        .from('people')
        .select(`
          id,
          full_name,
          title,
          slug,
          profile_image_url,
          company:current_company_id(name)
        `)
        .eq('published', true)
        .ilike('full_name', searchTerm)
        .order('featured', { ascending: false })
        .order('full_name', { ascending: true })
        .limit(Math.ceil(limit / 2))

      // Search companies
      const { data: companies } = await supabase
        .from('companies')
        .select('id, name, slug, logo_url, company_type, city, country')
        .eq('published', true)
        .ilike('name', searchTerm)
        .order('featured', { ascending: false })
        .order('name', { ascending: true })
        .limit(Math.ceil(limit / 2))

      const results: SearchResult[] = []

      // Add people results
      people?.forEach((person: any) => {
        results.push({
          id: person.id,
          type: 'person',
          title: person.full_name,
          subtitle: person.company?.name || person.title,
          image_url: person.profile_image_url,
          slug: person.slug
        })
      })

      // Add company results
      companies?.forEach((company: any) => {
        const location = [company.city, company.country].filter(Boolean).join(', ')
        results.push({
          id: company.id,
          type: 'company',
          title: company.name,
          subtitle: location || company.company_type,
          image_url: company.logo_url,
          slug: company.slug
        })
      })

      // Sort by relevance (exact matches first, then featured items)
      return results
        .sort((a, b) => {
          const queryLower = debouncedQuery.toLowerCase()
          const aExact = a.title.toLowerCase().includes(queryLower)
          const bExact = b.title.toLowerCase().includes(queryLower)
          
          if (aExact && !bExact) return -1
          if (!aExact && bExact) return 1
          
          return a.title.localeCompare(b.title)
        })
        .slice(0, limit)
    },
    enabled: !!debouncedQuery.trim()
  })
}
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import type { Company } from './useCompanies'

export interface Person {
  id: string
  full_name: string
  slug: string
  title?: string
  bio?: string
  current_company_id?: string
  profile_image_url?: string
  city?: string
  country?: string
  region?: string
  expertise_tags?: string[]
  social_links?: Record<string, any>
  contact_email?: string
  linkedin_url?: string
  twitter_url?: string
  meta_description?: string
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
  company?: Company
}

export const usePeople = (searchQuery?: string, companyId?: string) => {
  return useQuery({
    queryKey: ['people', searchQuery, companyId],
    queryFn: async () => {
      let query = supabase
        .from('people')
        .select(`
          *,
          company:current_company_id(*)
        `)
        .eq('published', true)
        .order('featured', { ascending: false })
        .order('full_name', { ascending: true })

      if (searchQuery) {
        query = query.ilike('full_name', `%${searchQuery}%`)
      }

      if (companyId) {
        query = query.eq('current_company_id', companyId)
      }

      const { data, error } = await query

      if (error) throw error
      return data as Person[]
    }
  })
}

export const usePerson = (slug: string) => {
  return useQuery({
    queryKey: ['person', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('people')
        .select(`
          *,
          company:current_company_id(*)
        `)
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (error) throw error
      return data as Person
    },
    enabled: !!slug
  })
}
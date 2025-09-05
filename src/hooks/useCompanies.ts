import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

export interface Company {
  id: string
  name: string
  slug: string
  description?: string
  website?: string
  logo_url?: string
  company_type: string
  founded_date?: string
  employee_count?: number
  industry_tags?: string[]
  city?: string
  country?: string
  region?: string
  social_links?: Record<string, any>
  contact_email?: string
  meta_description?: string
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
}

export const useCompanies = (searchQuery?: string, companyType?: string) => {
  return useQuery({
    queryKey: ['companies', searchQuery, companyType],
    queryFn: async () => {
      let query = supabase
        .from('companies')
        .select('*')
        .eq('published', true)
        .order('featured', { ascending: false })
        .order('name', { ascending: true })

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`)
      }

      if (companyType) {
        query = query.eq('company_type', companyType)
      }

      const { data, error } = await query

      if (error) throw error
      return data as Company[]
    }
  })
}

export const useCompany = (slug: string) => {
  return useQuery({
    queryKey: ['company', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (error) throw error
      return data as Company
    },
    enabled: !!slug
  })
}
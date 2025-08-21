import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

export interface Event {
  id: string
  title: string
  description?: string
  event_type: string
  location?: string
  venue?: string
  image_url?: string
  registration_url?: string
  organizer?: string
  start_date: string
  end_date?: string
  price?: number
  capacity?: number
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
}

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('published', true)
        .order('start_date', { ascending: true })
      
      if (error) throw error
      return data as Event[]
    }
  })
}
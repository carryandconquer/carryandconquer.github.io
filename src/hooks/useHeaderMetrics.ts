import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useQuery } from '@tanstack/react-query'

export interface HeaderMetric {
  id: string
  label: string
  value: string
  is_positive: boolean
  change_percentage: number | null
  order_index: number
  metric_key: string | null
}

export const useHeaderMetrics = () => {
  const [metrics, setMetrics] = useState<HeaderMetric[]>([])

  // Initial fetch
  const { data: initialData, isLoading } = useQuery({
    queryKey: ['header-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('header_carousel_metrics')
        .select('*')
        .eq('published', true)
        .order('order_index', { ascending: true })

      if (error) throw error
      return data as HeaderMetric[]
    }
  })

  // Set initial data
  useEffect(() => {
    if (initialData) {
      setMetrics(initialData)
    }
  }, [initialData])

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('header-metrics-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'header_carousel_metrics'
        },
        (payload) => {
          // Refetch data when any change occurs to maintain proper ordering
          supabase
            .from('header_carousel_metrics')
            .select('*')
            .eq('published', true)
            .order('order_index', { ascending: true })
            .then(({ data }) => {
              if (data) {
                setMetrics(data as HeaderMetric[])
              }
            })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { metrics, isLoading }
}
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SnapshotFilters {
  region?: string;
  country?: string;
  sector?: string;
  subSector?: string;
}

export interface MarketMetric {
  id: string;
  metric_name: string;
  metric_category: string;
  metric_family: string | null;
  current_value: string;
  change_percentage: number | null;
  change_direction: string | null;
}

export interface TrendingCompany {
  id: string;
  name: string;
  description: string | null;
  change_percentage: number | null;
  image_url: string | null;
}

export interface TrendingPerson {
  id: string;
  name: string;
  company: string;
  position: string;
  description: string | null;
  change_percentage: number | null;
  image_url: string | null;
}

export interface Deal {
  id: string;
  deal_name: string;
  deal_value_formatted: string | null;
  transaction_type: string;
  city: string | null;
  country: string | null;
  description: string | null;
  announcement_date: string | null;
}

export function useSnapshotData(filters: SnapshotFilters) {
  const { data: marketMetrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['snapshot-market-metrics', filters],
    queryFn: async () => {
      let query = supabase
        .from('snapshot_market_metrics')
        .select('*')
        .in('metric_category', ['Market Activity', 'news']);

      if (filters.region) {
        const { data: regions } = await supabase
          .from('snapshot_geographic_regions')
          .select('id')
          .ilike('name', `%${filters.region}%`);
        
        if (regions?.[0]?.id) {
          query = query.eq('region_id', regions[0].id);
        }
      }

      if (filters.country) {
        const { data: countries } = await supabase
          .from('snapshot_countries')
          .select('id')
          .ilike('name', `%${filters.country}%`);
        
        if (countries?.[0]?.id) {
          query = query.eq('country_id', countries[0].id);
        }
      }

      if (filters.sector) {
        const { data: sectors } = await supabase
          .from('snapshot_sectors')
          .select('id')
          .ilike('name', `%${filters.sector}%`);
        
        if (sectors?.[0]?.id) {
          query = query.eq('sector_id', sectors[0].id);
        }
      }

      if (filters.subSector) {
        const { data: subSectors } = await supabase
          .from('snapshot_sub_sectors')
          .select('id')
          .ilike('name', `%${filters.subSector}%`);
        
        if (subSectors?.[0]?.id) {
          query = query.eq('sub_sector_id', subSectors[0].id);
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as MarketMetric[];
    },
  });

  const { data: trendingCompanies, isLoading: companiesLoading } = useQuery({
    queryKey: ['snapshot-trending-companies', filters],
    queryFn: async () => {
      let query = supabase
        .from('snapshot_trending_companies')
        .select('*')
        .eq('published', true)
        .order('change_percentage', { ascending: false })
        .limit(6);

      if (filters.region) {
        const { data: regions } = await supabase
          .from('snapshot_geographic_regions')
          .select('id')
          .ilike('name', `%${filters.region}%`);
        
        if (regions?.[0]?.id) {
          query = query.eq('region_id', regions[0].id);
        }
      }

      if (filters.country) {
        const { data: countries } = await supabase
          .from('snapshot_countries')
          .select('id')
          .ilike('name', `%${filters.country}%`);
        
        if (countries?.[0]?.id) {
          query = query.eq('country_id', countries[0].id);
        }
      }

      if (filters.sector) {
        const { data: sectors } = await supabase
          .from('snapshot_sectors')
          .select('id')
          .ilike('name', `%${filters.sector}%`);
        
        if (sectors?.[0]?.id) {
          query = query.eq('sector_id', sectors[0].id);
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as TrendingCompany[];
    },
  });

  const { data: trendingPeople, isLoading: peopleLoading } = useQuery({
    queryKey: ['snapshot-trending-people', filters],
    queryFn: async () => {
      let query = supabase
        .from('snapshot_trending_people')
        .select('*')
        .eq('published', true)
        .order('change_percentage', { ascending: false })
        .limit(6);

      if (filters.region) {
        const { data: regions } = await supabase
          .from('snapshot_geographic_regions')
          .select('id')
          .ilike('name', `%${filters.region}%`);
        
        if (regions?.[0]?.id) {
          query = query.eq('region_id', regions[0].id);
        }
      }

      if (filters.country) {
        const { data: countries } = await supabase
          .from('snapshot_countries')
          .select('id')
          .ilike('name', `%${filters.country}%`);
        
        if (countries?.[0]?.id) {
          query = query.eq('country_id', countries[0].id);
        }
      }

      if (filters.sector) {
        const { data: sectors } = await supabase
          .from('snapshot_sectors')
          .select('id')
          .ilike('name', `%${filters.sector}%`);
        
        if (sectors?.[0]?.id) {
          query = query.eq('sector_id', sectors[0].id);
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as TrendingPerson[];
    },
  });

  const { data: deals, isLoading: dealsLoading } = useQuery({
    queryKey: ['snapshot-deals', filters],
    queryFn: async () => {
      let query = supabase
        .from('deals')
        .select('*')
        .eq('published', true)
        .order('announcement_date', { ascending: false })
        .limit(5);

      if (filters.region) {
        query = query.ilike('region', `%${filters.region}%`);
      }

      if (filters.country) {
        query = query.ilike('country', `%${filters.country}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Deal[];
    },
  });

  return {
    marketMetrics: marketMetrics || [],
    trendingCompanies: trendingCompanies || [],
    trendingPeople: trendingPeople || [],
    deals: deals || [],
    isLoading: metricsLoading || companiesLoading || peopleLoading || dealsLoading,
  };
}
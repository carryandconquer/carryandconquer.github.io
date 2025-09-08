import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FilterOption {
  value: string;
  label: string;
}

export function useSnapshotFilters() {
  const { data: regions, isLoading: regionsLoading } = useQuery({
    queryKey: ['snapshot-regions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('snapshot_geographic_regions')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data.map(region => ({
        value: region.slug,
        label: region.name
      })) as FilterOption[];
    },
  });

  const { data: countries, isLoading: countriesLoading } = useQuery({
    queryKey: ['snapshot-countries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('snapshot_countries')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data.map(country => ({
        value: country.slug,
        label: country.name
      })) as FilterOption[];
    },
  });

  const { data: sectors, isLoading: sectorsLoading } = useQuery({
    queryKey: ['snapshot-sectors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('snapshot_sectors')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data.map(sector => ({
        value: sector.slug,
        label: sector.name
      })) as FilterOption[];
    },
  });

  const { data: subSectors, isLoading: subSectorsLoading } = useQuery({
    queryKey: ['snapshot-sub-sectors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('snapshot_sub_sectors')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data.map(subSector => ({
        value: subSector.slug,
        label: subSector.name
      })) as FilterOption[];
    },
  });

  return {
    regions: regions || [],
    countries: countries || [],
    sectors: sectors || [],
    subSectors: subSectors || [],
    isLoading: regionsLoading || countriesLoading || sectorsLoading || subSectorsLoading,
  };
}
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { generateSlug } from '@/lib/slugUtils'

export interface Article {
  id: string
  category: string
  title: string
  subtitle: string | null
  excerpt: string | null
  author_name: string | null
  published_date: string | null
  read_time: number | null
  content: string | null
  image_url: string | null
  published: boolean | null
}

export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('published_date', { ascending: false })

      if (error) throw error
      return data as Article[]
    }
  })
}

export const useArticle = (slug: string) => {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      // First try to fetch by id if slug is a UUID
      let query = supabase
        .from('articles')
        .select('*')
        .eq('published', true)

      // Try to find by id first (for backward compatibility)
      if (slug.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        query = query.eq('id', slug)
      } else {
        // If not a UUID, we need to find by matching the generated slug
        const { data: allArticles } = await supabase
          .from('articles')
          .select('*')
          .eq('published', true)

        if (allArticles) {
          const article = allArticles.find(article => 
            generateSlug(article.title) === slug
          )
          
          if (!article) return null
          return article as Article
        }
        return null
      }

      const { data, error } = await query.single()
      
      if (error) {
        if (error.code === 'PGRST116') return null // Not found
        throw error
      }
      
      return data as Article
    },
    enabled: !!slug
  })
}

export const useArticleCategories = () => {
  return useQuery({
    queryKey: ['article-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('category')
        .eq('published', true)
        .not('category', 'is', null)

      if (error) throw error
      
      const uniqueCategories = [...new Set(data.map(item => item.category))].filter(Boolean)
      return uniqueCategories as string[]
    }
  })
}
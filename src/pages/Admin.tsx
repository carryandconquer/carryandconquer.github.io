import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { CalendarIcon, Users, TrendingUp, FileText, Calendar, Settings, Plus, Edit, Trash2, Eye, BarChart3 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

// Database interfaces matching Supabase schema
interface Article {
  id: string
  title: string
  subtitle?: string
  content?: string
  category: string
  image_url?: string
  author_name?: string
  published: boolean
  featured: boolean
  created_at: string
  view_count: number
  excerpt?: string
}

interface Event {
  id: string
  title: string
  description?: string
  event_type: string
  start_date: string
  end_date?: string
  location?: string
  venue?: string
  capacity?: number
  price?: number
  organizer?: string
  featured: boolean
  published: boolean
  created_at: string
}

interface MarketMetric {
  id: string
  metric_name: string
  metric_category: string
  metric_family: string
  current_value: string
  change_percentage?: number
  change_direction?: string
  created_at: string
}

export default function Admin() {
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState("overview")
  const [showArticleForm, setShowArticleForm] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)
  const [showMetricForm, setShowMetricForm] = useState(false)

  // Fetch articles
  const { data: articles = [], isLoading: articlesLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data as Article[]
    }
  })

  // Fetch events
  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: false })
      
      if (error) throw error
      return data as Event[]
    }
  })

  // Fetch market metrics
  const { data: marketMetrics = [], isLoading: metricsLoading } = useQuery({
    queryKey: ['market-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('snapshot_market_metrics')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data as MarketMetric[]
    }
  })

  // Create article mutation
  const createArticleMutation = useMutation({
    mutationFn: async (articleData: {
      title: string;
      subtitle?: string;
      content?: string;
      category: string;
      author_name?: string;
      published: boolean;
      featured: boolean;
      excerpt?: string;
    }) => {
      const { data, error } = await supabase
        .from('articles')
        .insert(articleData)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      setShowArticleForm(false)
      toast({ title: "Article created successfully" })
    },
    onError: (error) => {
      toast({ title: "Error creating article", description: error.message, variant: "destructive" })
    }
  })

  // Create event mutation
  const createEventMutation = useMutation({
    mutationFn: async (eventData: {
      title: string;
      description?: string;
      event_type: string;
      start_date: string;
      location?: string;
      venue?: string;
      capacity?: number;
      price?: number;
      organizer?: string;
      published: boolean;
      featured: boolean;
    }) => {
      const { data, error } = await supabase
        .from('events')
        .insert(eventData)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      setShowEventForm(false)
      toast({ title: "Event created successfully" })
    },
    onError: (error) => {
      toast({ title: "Error creating event", description: error.message, variant: "destructive" })
    }
  })

  // Create metric mutation
  const createMetricMutation = useMutation({
    mutationFn: async (metricData: {
      metric_name: string;
      metric_category: string;
      metric_family: string;
      current_value: string;
      change_percentage?: number;
      change_direction?: string;
    }) => {
      const { data, error } = await supabase
        .from('snapshot_market_metrics')
        .insert(metricData)
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['market-metrics'] })
      setShowMetricForm(false)
      toast({ title: "Metric created successfully" })
    },
    onError: (error) => {
      toast({ title: "Error creating metric", description: error.message, variant: "destructive" })
    }
  })

  // Toggle featured mutations
  const toggleArticleFeaturedMutation = useMutation({
    mutationFn: async ({ id, featured }: { id: string, featured: boolean }) => {
      const { error } = await supabase
        .from('articles')
        .update({ featured })
        .eq('id', id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    }
  })

  const toggleEventFeaturedMutation = useMutation({
    mutationFn: async ({ id, featured }: { id: string, featured: boolean }) => {
      const { error } = await supabase
        .from('events')
        .update({ featured })
        .eq('id', id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    }
  })

  // Delete mutations
  const deleteArticleMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      toast({ title: "Article deleted successfully" })
    }
  })

  const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      toast({ title: "Event deleted successfully" })
    }
  })

  const deleteMetricMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('snapshot_market_metrics')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['market-metrics'] })
      toast({ title: "Metric deleted successfully" })
    }
  })

  const handleCreateArticle = (data: any) => {
    createArticleMutation.mutate({
      title: data.title,
      subtitle: data.subtitle,
      content: data.content,
      category: data.category,
      author_name: data.author,
      published: data.status === 'published',
      featured: data.featured,
      excerpt: data.excerpt
    })
  }

  const handleCreateEvent = (data: any) => {
    createEventMutation.mutate({
      title: data.title,
      description: data.description,
      event_type: data.type,
      start_date: data.date,
      location: data.location,
      venue: data.venue,
      capacity: parseInt(data.capacity) || undefined,
      price: parseFloat(data.price) || undefined,
      organizer: data.organizer,
      published: data.status === 'published',
      featured: data.featured
    })
  }

  const handleCreateMetric = (data: any) => {
    const changeValue = parseFloat(data.change.replace(/[^-\d.]/g, ''))
    createMetricMutation.mutate({
      metric_name: data.label.toUpperCase(),
      metric_category: 'PE_METRICS',
      metric_family: 'MARKET_DATA',
      current_value: data.value,
      change_percentage: changeValue,
      change_direction: changeValue >= 0 ? 'up' : 'down'
    })
  }

  const toggleArticleFeatured = (id: string, currentFeatured: boolean) => {
    toggleArticleFeaturedMutation.mutate({ id, featured: !currentFeatured })
  }

  const toggleEventFeatured = (id: string, currentFeatured: boolean) => {
    toggleEventFeaturedMutation.mutate({ id, featured: !currentFeatured })
  }

  const deleteArticle = (id: string) => {
    deleteArticleMutation.mutate(id)
  }

  const deleteEvent = (id: string) => {
    deleteEventMutation.mutate(id)
  }

  const deleteMetric = (id: string) => {
    deleteMetricMutation.mutate(id)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your platform content and events</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setShowArticleForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Article
              </Button>
              <Button onClick={() => setShowEventForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Event
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{articles.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {articles.filter(a => a.published).length} published
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{events.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {events.filter(e => e.published).length} published
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {articles.reduce((sum, article) => sum + (article.view_count || 0), 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Market Metrics</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{marketMetrics.length}</div>
                  <p className="text-xs text-muted-foreground">Active metrics</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {articles.slice(0, 5).map(article => (
                      <div key={article.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{article.title}</p>
                          <p className="text-sm text-muted-foreground">{article.author_name} • {article.view_count || 0} views</p>
                        </div>
                        <Badge variant={article.published ? 'default' : 'secondary'}>
                          {article.published ? 'published' : 'draft'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {events.slice(0, 5).map(event => (
                      <div key={event.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{new Date(event.start_date).toLocaleDateString()} • {event.location}</p>
                        </div>
                        <Badge variant={event.published ? 'default' : 'secondary'}>
                          {event.event_type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            {!showArticleForm ? (
              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                  <CardDescription>Manage articles and publications</CardDescription>
                </CardHeader>
                <CardContent>
                  {articlesLoading ? (
                    <p>Loading articles...</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Featured</TableHead>
                          <TableHead>Views</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {articles.map(article => (
                          <TableRow key={article.id}>
                            <TableCell className="font-medium">{article.title}</TableCell>
                            <TableCell>{article.category}</TableCell>
                            <TableCell>{article.author_name || 'Unknown'}</TableCell>
                            <TableCell>
                              <Badge variant={article.published ? 'default' : 'secondary'}>
                                {article.published ? 'published' : 'draft'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Switch 
                                checked={article.featured} 
                                onCheckedChange={() => toggleArticleFeatured(article.id, article.featured)}
                              />
                            </TableCell>
                            <TableCell>{article.view_count || 0}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => deleteArticle(article.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            ) : (
              <ArticleForm onSubmit={handleCreateArticle} onCancel={() => setShowArticleForm(false)} />
            )}
          </TabsContent>

          {/* Events Management Tab */}
          <TabsContent value="events" className="space-y-6">
            {!showEventForm ? (
              <Card>
                <CardHeader>
                  <CardTitle>Event Management</CardTitle>
                  <CardDescription>Manage events and registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  {eventsLoading ? (
                    <p>Loading events...</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Capacity</TableHead>
                          <TableHead>Featured</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {events.map(event => (
                          <TableRow key={event.id}>
                            <TableCell className="font-medium">{event.title}</TableCell>
                            <TableCell>{event.event_type}</TableCell>
                            <TableCell>{new Date(event.start_date).toLocaleDateString()}</TableCell>
                            <TableCell>{event.location || 'TBD'}</TableCell>
                            <TableCell>{event.capacity || 'Unlimited'}</TableCell>
                            <TableCell>
                              <Switch 
                                checked={event.featured} 
                                onCheckedChange={() => toggleEventFeatured(event.id, event.featured)}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => deleteEvent(event.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            ) : (
              <EventForm onSubmit={handleCreateEvent} onCancel={() => setShowEventForm(false)} />
            )}
          </TabsContent>

          {/* Metrics Management Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Market Metrics</h3>
                <p className="text-sm text-muted-foreground">Manage carousel metrics displayed on the homepage</p>
              </div>
              <Button onClick={() => setShowMetricForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Metric
              </Button>
            </div>

            {!showMetricForm ? (
              <Card>
                <CardContent className="p-6">
                  {metricsLoading ? (
                    <p>Loading metrics...</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Metric Name</TableHead>
                          <TableHead>Current Value</TableHead>
                          <TableHead>Change</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {marketMetrics.map(metric => (
                          <TableRow key={metric.id}>
                            <TableCell className="font-medium">{metric.metric_name}</TableCell>
                            <TableCell>{metric.current_value}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center ${
                                metric.change_direction === 'up' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {metric.change_percentage ? `${metric.change_percentage > 0 ? '+' : ''}${metric.change_percentage}%` : 'N/A'}
                              </span>
                            </TableCell>
                            <TableCell>{metric.metric_category}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => deleteMetric(metric.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            ) : (
              <MetricForm onSubmit={handleCreateMetric} onCancel={() => setShowMetricForm(false)} />
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure platform settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings panel - Configure your platform preferences here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Article Form Component
function ArticleForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: '',
    author: '',
    excerpt: '',
    content: '',
    status: 'draft',
    featured: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Article</CardTitle>
        <CardDescription>Add a new article to your platform</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Market Trends">Market Trends</SelectItem>
                  <SelectItem value="Key Deals">Key Deals</SelectItem>
                  <SelectItem value="Analysis">Analysis</SelectItem>
                  <SelectItem value="News">News</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={8}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
            />
            <Label htmlFor="featured">Featured Article</Label>
          </div>

          <div className="flex gap-4">
            <Button type="submit">Create Article</Button>
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// Event Form Component
function EventForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    date: '',
    location: '',
    venue: '',
    capacity: '',
    price: '',
    organizer: '',
    status: 'draft',
    featured: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
        <CardDescription>Add a new event to your platform</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Conference">Conference</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Panel">Panel</SelectItem>
                  <SelectItem value="Webinar">Webinar</SelectItem>
                  <SelectItem value="Networking">Networking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="datetime-local"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="organizer">Organizer</Label>
              <Input
                id="organizer"
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured">Featured Event</Label>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit">Create Event</Button>
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// Metric Form Component
function MetricForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    label: '',
    value: '',
    change: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Metric</CardTitle>
        <CardDescription>Add a new market metric to display</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="label">Metric Label</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="e.g., PE DRY POWDER"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="value">Current Value</Label>
              <Input
                id="value"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder="e.g., $3.7T"
                required
              />
            </div>
            <div>
              <Label htmlFor="change">Change Percentage</Label>
              <Input
                id="change"
                value={formData.change}
                onChange={(e) => setFormData({ ...formData, change: e.target.value })}
                placeholder="e.g., +8.3%"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit">Create Metric</Button>
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
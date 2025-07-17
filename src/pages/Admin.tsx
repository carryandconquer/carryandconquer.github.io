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

interface Article {
  id: number
  title: string
  category: string
  author: string
  status: 'published' | 'draft'
  featured: boolean
  createdAt: string
  views: number
}

interface Event {
  id: number
  title: string
  type: string
  date: string
  location: string
  capacity: number
  registered: number
  status: 'published' | 'draft'
  featured: boolean
}

interface CarouselMetric {
  id: number
  label: string
  value: string
  change: string
  isPositive: boolean
  isActive: boolean
}

export default function Admin() {
  const [articles, setArticles] = useState<Article[]>([
    { id: 1, title: "Private Equity Market Outlook 2024", category: "Market Trends", author: "Sarah Chen", status: "published", featured: true, createdAt: "2024-01-15", views: 1250 },
    { id: 2, title: "ESG Integration in PE Investments", category: "Key Deals", author: "Michael Rodriguez", status: "published", featured: false, createdAt: "2024-01-12", views: 890 },
    { id: 3, title: "Tech Sector M&A Analysis", category: "Analysis", author: "David Kim", status: "draft", featured: false, createdAt: "2024-01-10", views: 0 }
  ])

  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: "PE Summit 2024", type: "Conference", date: "2024-03-15", location: "New York", capacity: 500, registered: 347, status: "published", featured: true },
    { id: 2, title: "Deal Sourcing Masterclass", type: "Workshop", date: "2024-02-20", location: "Virtual", capacity: 100, registered: 78, status: "published", featured: false },
    { id: 3, title: "ESG Investment Forum", type: "Panel", date: "2024-04-05", location: "London", capacity: 200, registered: 0, status: "draft", featured: false }
  ])

  const [carouselMetrics, setCarouselMetrics] = useState<CarouselMetric[]>([
    { id: 1, label: "PE DRY POWDER", value: "$3.7T", change: "+8.3%", isPositive: true, isActive: true },
    { id: 2, label: "AVERAGE DEAL SIZE", value: "$124M", change: "-2.1%", isPositive: false, isActive: true },
    { id: 3, label: "FUND DEPLOYMENT", value: "67%", change: "+12.4%", isPositive: true, isActive: true },
    { id: 4, label: "EXIT MULTIPLE", value: "2.8x", change: "+5.7%", isPositive: true, isActive: true },
    { id: 5, label: "ACTIVE FUNDS", value: "8,947", change: "+15.2%", isPositive: true, isActive: true },
    { id: 6, label: "PORTFOLIO COMPANIES", value: "11,200+", change: "+9.8%", isPositive: true, isActive: true },
    { id: 7, label: "MEDIAN IRR", value: "14.2%", change: "-1.3%", isPositive: false, isActive: true },
    { id: 8, label: "FUNDRAISING YTD", value: "$901B", change: "+22.1%", isPositive: true, isActive: true }
  ])

  const [activeTab, setActiveTab] = useState("overview")
  const [showArticleForm, setShowArticleForm] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)
  const [showCarouselForm, setShowCarouselForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [editingMetric, setEditingMetric] = useState<CarouselMetric | null>(null)

  const handleCreateArticle = (data: any) => {
    const newArticle: Article = {
      id: articles.length + 1,
      title: data.title,
      category: data.category,
      author: data.author,
      status: data.status,
      featured: data.featured,
      createdAt: new Date().toISOString().split('T')[0],
      views: 0
    }
    setArticles([...articles, newArticle])
    setShowArticleForm(false)
    toast({ title: "Article created successfully" })
  }

  const handleCreateEvent = (data: any) => {
    const newEvent: Event = {
      id: events.length + 1,
      title: data.title,
      type: data.type,
      date: data.date,
      location: data.location,
      capacity: data.capacity,
      registered: 0,
      status: data.status,
      featured: data.featured
    }
    setEvents([...events, newEvent])
    setShowEventForm(false)
    toast({ title: "Event created successfully" })
  }

  const toggleArticleFeatured = (id: number) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, featured: !article.featured } : article
    ))
  }

  const toggleEventFeatured = (id: number) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, featured: !event.featured } : event
    ))
  }

  const deleteArticle = (id: number) => {
    setArticles(articles.filter(article => article.id !== id))
    toast({ title: "Article deleted successfully" })
  }

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id))
    toast({ title: "Event deleted successfully" })
  }

  const handleCreateMetric = (data: any) => {
    const newMetric: CarouselMetric = {
      id: carouselMetrics.length + 1,
      label: data.label.toUpperCase(),
      value: data.value,
      change: data.change,
      isPositive: parseFloat(data.change.replace(/[^-\d.]/g, '')) >= 0,
      isActive: data.isActive
    }
    setCarouselMetrics([...carouselMetrics, newMetric])
    setShowCarouselForm(false)
    toast({ title: "Metric created successfully" })
  }

  const toggleMetricActive = (id: number) => {
    setCarouselMetrics(carouselMetrics.map(metric => 
      metric.id === id ? { ...metric, isActive: !metric.isActive } : metric
    ))
  }

  const deleteMetric = (id: number) => {
    setCarouselMetrics(carouselMetrics.filter(metric => metric.id !== id))
    toast({ title: "Metric deleted successfully" })
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
            <TabsTrigger value="carousel" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Carousel
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
                    {articles.filter(a => a.status === 'published').length} published
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
                    {events.filter(e => e.status === 'published').length} published
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
                    {articles.reduce((sum, article) => sum + article.views, 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Event Registrations</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {events.reduce((sum, event) => sum + event.registered, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Total registered</p>
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
                          <p className="text-sm text-muted-foreground">{article.author} • {article.views} views</p>
                        </div>
                        <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                          {article.status}
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
                          <p className="text-sm text-muted-foreground">{event.date} • {event.location}</p>
                        </div>
                        <Badge variant={event.status === 'published' ? 'default' : 'secondary'}>
                          {event.registered}/{event.capacity}
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
                          <TableCell>{article.author}</TableCell>
                          <TableCell>
                            <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                              {article.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Switch 
                              checked={article.featured} 
                              onCheckedChange={() => toggleArticleFeatured(article.id)}
                            />
                          </TableCell>
                          <TableCell>{article.views}</TableCell>
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
                          <TableCell>{event.type}</TableCell>
                          <TableCell>{event.date}</TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>{event.registered}/{event.capacity}</TableCell>
                          <TableCell>
                            <Switch 
                              checked={event.featured} 
                              onCheckedChange={() => toggleEventFeatured(event.id)}
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
                </CardContent>
              </Card>
            ) : (
              <EventForm onSubmit={handleCreateEvent} onCancel={() => setShowEventForm(false)} />
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure your platform preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input id="siteName" defaultValue="Carry & Conquer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input id="adminEmail" type="email" defaultValue="admin@carryconquer.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea 
                    id="siteDescription" 
                    defaultValue="The premier private equity intelligence platform providing deep insights on transactions, market trends, and firm strategies."
                  />
                </div>

                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Carousel Management Tab */}
          <TabsContent value="carousel" className="space-y-6">
            {!showCarouselForm ? (
              <Card>
                <CardHeader>
                  <CardTitle>Carousel Metrics Management</CardTitle>
                  <CardDescription>Manage the metrics displayed in the top carousel</CardDescription>
                  <Button onClick={() => setShowCarouselForm(true)} className="w-fit">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Metric
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Label</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Trend</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {carouselMetrics.map(metric => (
                        <TableRow key={metric.id}>
                          <TableCell className="font-medium">{metric.label}</TableCell>
                          <TableCell className="font-bold">{metric.value}</TableCell>
                          <TableCell>
                            <span className={metric.isPositive ? 'text-green-600' : 'text-red-600'}>
                              {metric.change}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant={metric.isPositive ? 'default' : 'destructive'}>
                              {metric.isPositive ? 'Up' : 'Down'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Switch 
                              checked={metric.isActive} 
                              onCheckedChange={() => toggleMetricActive(metric.id)}
                            />
                          </TableCell>
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
                </CardContent>
              </Card>
            ) : (
              <MetricForm onSubmit={handleCreateMetric} onCancel={() => setShowCarouselForm(false)} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Metric Form Component
function MetricForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    label: '',
    value: '',
    change: '',
    isActive: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Metric</CardTitle>
        <CardDescription>Create a new metric for the carousel display</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="label">Metric Label</Label>
              <Input
                id="label"
                placeholder="e.g., TOTAL AUM"
                value={formData.label}
                onChange={(e) => setFormData({...formData, label: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Current Value</Label>
              <Input
                id="value"
                placeholder="e.g., $2.4T"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="change">Percentage Change</Label>
              <Input
                id="change"
                placeholder="e.g., +5.2% or -3.1%"
                value={formData.change}
                onChange={(e) => setFormData({...formData, change: e.target.value})}
                required
              />
            </div>
            <div className="flex items-center space-x-2 mt-8">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
              />
              <Label htmlFor="isActive">Display in carousel</Label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit">Create Metric</Button>
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// Article Form Component
function ArticleForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    subtitle: '',
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
        <CardDescription>Fill in the article details below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input 
                id="title" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Market Trends">Market Trends</SelectItem>
                  <SelectItem value="Key Deals">Key Deals</SelectItem>
                  <SelectItem value="Analysis">Analysis</SelectItem>
                  <SelectItem value="Industry Insights">Industry Insights</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input 
                id="author" 
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input 
                id="subtitle" 
                value={formData.subtitle}
                onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea 
              id="excerpt" 
              value={formData.excerpt}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              placeholder="Brief summary of the article..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea 
              id="content" 
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Write your article content here..."
              className="min-h-[200px]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
                />
                <Label htmlFor="featured">Featured Article</Label>
              </div>
              
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                Create Article
              </Button>
            </div>
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
    type: '',
    date: '',
    location: '',
    capacity: 100,
    pricing: '',
    registration: '',
    description: '',
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
        <CardDescription>Configure event details and logistics</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input 
                id="title" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Event Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date">Event Date *</Label>
              <Input 
                id="date" 
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="City or Virtual"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input 
                id="capacity" 
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pricing">Pricing</Label>
              <Input 
                id="pricing" 
                value={formData.pricing}
                onChange={(e) => setFormData({...formData, pricing: e.target.value})}
                placeholder="Free, $99, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registration">Registration Link</Label>
              <Input 
                id="registration" 
                type="url"
                value={formData.registration}
                onChange={(e) => setFormData({...formData, registration: e.target.value})}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Event Description</Label>
            <Textarea 
              id="description" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the event, agenda, speakers..."
              className="min-h-[120px]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
                />
                <Label htmlFor="featured">Featured Event</Label>
              </div>
              
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                Create Event
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
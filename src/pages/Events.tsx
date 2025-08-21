import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users, ArrowRight, ExternalLink } from "lucide-react"
import { useEvents } from "@/hooks/useEvents"
import { format } from "date-fns"

const formatEventDate = (startDate: string, endDate?: string) => {
  const start = new Date(startDate)
  if (endDate) {
    const end = new Date(endDate)
    if (start.toDateString() === end.toDateString()) {
      return format(start, "MMM d, yyyy")
    } else {
      return `${format(start, "MMM d")}-${format(end, "d, yyyy")}`
    }
  }
  return format(start, "MMM d, yyyy")
}

const getEventImage = (imageUrl?: string) => {
  return imageUrl || "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
}

export default function Events() {
  const { data: events = [], isLoading, error } = useEvents()

  return (
    <div className="min-h-screen font-primary bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden bg-black">
        {/* Wave Pattern Background */}
        <div className="absolute inset-0 opacity-15">
          <svg viewBox="0 0 1200 400" className="absolute inset-0 w-full h-full">
            <path d="M0,150 C300,250 600,50 1200,200 L1200,400 L0,400 Z" fill="url(#eventsWave)" />
            <defs>
              <linearGradient id="eventsWave" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(180 84% 40%)" stopOpacity="0.4" />
                <stop offset="50%" stopColor="hsl(190 95% 45%)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(142 76% 36%)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-16 left-10 w-20 h-10 bg-teal-500/15 rounded-full rotate-45 animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-green-500/15 rounded-2xl -rotate-12 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-8 left-1/3 w-18 h-18 bg-cyan-500/15 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight animate-fade-in">
              Industry
              <span className="block text-green-400">
                Events
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed animate-fade-in">
              Stay connected with exclusive events, conferences, and networking opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {isLoading ? (
            <div className="text-center text-white/70">Loading events...</div>
          ) : error ? (
            <div className="text-center text-red-400">Error loading events</div>
          ) : events.length === 0 ? (
            <div className="text-center text-white/70">No upcoming events found</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <Card 
                  key={event.id}
                  className="group hover:shadow-lift transition-all duration-300 hover:-translate-y-2 bg-gray-900/50 backdrop-blur-sm border-gray-800 overflow-hidden"
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={getEventImage(event.image_url)} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-green-500/90 text-white rounded-full text-xs font-medium backdrop-blur-sm">
                        {event.event_type}
                      </span>
                    </div>
                    {event.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-yellow-500/90 text-white rounded-full text-xs font-medium backdrop-blur-sm">
                          Featured
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4">
                      <span className="px-3 py-1 bg-black/80 text-white rounded-full text-sm font-semibold backdrop-blur-sm">
                        {event.price && event.price > 0 ? `$${event.price}` : 'Free'}
                      </span>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold text-white leading-tight">
                      {event.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {event.description && (
                      <CardDescription className="text-white/70 leading-relaxed line-clamp-3">
                        {event.description}
                      </CardDescription>
                    )}
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-white/70">
                        <Calendar className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                        <span>{formatEventDate(event.start_date, event.end_date)}</span>
                      </div>
                      
                      {(event.location || event.venue) && (
                        <div className="flex items-center text-sm text-white/70">
                          <MapPin className="w-4 h-4 mr-2 text-teal-400 flex-shrink-0" />
                          <span>{event.venue ? `${event.venue}, ${event.location || ''}` : event.location}</span>
                        </div>
                      )}
                      
                      {event.capacity && (
                        <div className="flex items-center text-sm text-white/70">
                          <Users className="w-4 h-4 mr-2 text-cyan-400 flex-shrink-0" />
                          <span>{event.capacity}+ capacity</span>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full mt-6 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white transition-all duration-300 group-hover:scale-105"
                      asChild
                    >
                      {event.registration_url ? (
                        <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                          Register Now
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                      ) : (
                        <span>
                          Learn More
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
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
      <section className="relative pt-32 pb-20 overflow-hidden bg-black">
        {/* Wave Pattern Background */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full">
            <path d="M0,300 C300,500 600,100 1200,400 L1200,800 L0,800 Z" fill="url(#eventsWave)" />
            <defs>
              <linearGradient id="eventsWave" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(180 84% 40%)" stopOpacity="0.6" />
                <stop offset="50%" stopColor="hsl(190 95% 45%)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(142 76% 36%)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-16 bg-teal-500/20 rounded-full rotate-45 animate-float"></div>
        <div className="absolute top-32 right-20 w-20 h-20 bg-green-500/20 rounded-2xl -rotate-12 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-cyan-500/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Industry
              <span className="block text-green-400">
                Events
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed">
              Stay connected with the private equity ecosystem through exclusive events, 
              conferences, and networking opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Upcoming Events
            </h2>
            <p className="text-xl text-white/70">
              Don't miss these important industry gatherings
            </p>
          </div>

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

      {/* Event Categories */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Event Categories
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Conferences", count: "12", color: "green-400" },
              { name: "Networking", count: "8", color: "teal-400" },
              { name: "Workshops", count: "6", color: "cyan-400" },
              { name: "Webinars", count: "15", color: "blue-400" }
            ].map((category, index) => (
              <div 
                key={category.name}
                className="text-center p-8 bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-lift border border-gray-800 hover:shadow-lift transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`text-4xl font-bold text-${category.color} mb-2`}>
                  {category.count}
                </div>
                <div className="text-white/70 font-medium">
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
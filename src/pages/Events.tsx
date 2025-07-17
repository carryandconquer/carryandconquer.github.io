import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"

const upcomingEvents = [
  {
    title: "PE Leaders Summit 2024",
    date: "March 15-17, 2024",
    location: "New York, NY",
    attendees: "500+",
    description: "Annual gathering of top private equity executives discussing market trends and opportunities.",
    type: "Conference"
  },
  {
    title: "Healthcare Investment Forum",
    date: "April 8, 2024",
    location: "Boston, MA",
    attendees: "200+",
    description: "Focused discussions on healthcare sector investments and regulatory changes.",
    type: "Forum"
  },
  {
    title: "Tech PE Networking",
    date: "April 22, 2024",
    location: "San Francisco, CA",
    attendees: "150+",
    description: "Networking event for technology-focused private equity professionals.",
    type: "Networking"
  }
]

export default function Events() {
  return (
    <div className="min-h-screen font-primary bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Floating Geometric Elements */}
        <div className="absolute top-20 left-10 w-32 h-16 bg-accent-green/20 rounded-full rotate-45 animate-float"></div>
        <div className="absolute top-32 right-20 w-20 h-20 bg-primary/20 rounded-2xl -rotate-12 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-accent-gold/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
              Industry
              <span className="block bg-gradient-text bg-clip-text text-transparent">
                Events
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Stay connected with the private equity ecosystem through exclusive events, 
              conferences, and networking opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Upcoming Events
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't miss these important industry gatherings
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card 
                key={index}
                className="group hover:shadow-lift transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-border/50 overflow-hidden"
              >
                <CardHeader className="relative">
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {event.type}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-card-foreground pr-20">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </CardDescription>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2 text-accent-green" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2 text-accent-gold" />
                      {event.attendees} expected attendees
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6 bg-gradient-button hover:shadow-glow transition-all duration-300 group-hover:scale-105">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Event Categories
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Conferences", count: "12", color: "primary" },
              { name: "Networking", count: "8", color: "accent-green" },
              { name: "Workshops", count: "6", color: "accent-gold" },
              { name: "Webinars", count: "15", color: "accent-orange" }
            ].map((category, index) => (
              <div 
                key={category.name}
                className="text-center p-8 bg-background rounded-3xl shadow-card border border-border/50 hover:shadow-lift transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`text-4xl font-bold text-${category.color} mb-2`}>
                  {category.count}
                </div>
                <div className="text-muted-foreground font-medium">
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
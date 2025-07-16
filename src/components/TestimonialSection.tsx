import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "Carry & Conquer has transformed how we analyze market opportunities. The depth of PE intelligence is unparalleled.",
    author: "Sarah Chen",
    title: "Managing Director",
    company: "Blackstone Alternative Asset Management"
  },
  {
    quote: "The transaction intelligence helped us identify key market trends 6 months before our competitors. Game-changing insights.",
    author: "Michael Rodriguez",
    title: "Partner",
    company: "KKR Strategic Investments"
  },
  {
    quote: "Data accuracy and real-time updates give us the competitive edge we need in today's fast-moving PE landscape.",
    author: "Jennifer Park",
    title: "Investment Director",
    company: "Apollo Global Management"
  }
]

export function TestimonialSection() {
  return (
    <section className="py-32 bg-gradient-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Trusted by
            <span className="block bg-gradient-text bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See what top private equity professionals are saying about our intelligence platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group hover:shadow-lift transition-all duration-300 hover:-translate-y-1 bg-background/50 backdrop-blur-sm border-border/50"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-primary mb-6 opacity-60" />
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-border pt-6">
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                  <div className="text-sm text-primary font-medium">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
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
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Wave pattern background */}
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full">
          <path 
            d="M0,600 C400,400 800,800 1200,500 L1200,800 L0,800 Z" 
            fill="url(#testimonialWave)"
          />
          <defs>
            <linearGradient id="testimonialWave" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(180 84% 40%)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="hsl(190 95% 45%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(142 76% 36%)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by
            <span className="block text-green-400">
              Industry Leaders
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            See what top private equity professionals are saying about our intelligence platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group hover:shadow-lift transition-all duration-300 hover:-translate-y-1 bg-gray-900/50 backdrop-blur-sm border-gray-800"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-green-400 mb-6 opacity-60" />
                <blockquote className="text-white mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-gray-800 pt-6">
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-white/70">{testimonial.title}</div>
                  <div className="text-sm text-green-400 font-medium">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
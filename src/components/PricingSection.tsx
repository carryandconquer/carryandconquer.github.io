import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star } from "lucide-react"

const plans = [
  {
    name: "Professional",
    price: "$299",
    period: "per month",
    description: "Perfect for individual professionals and small teams",
    features: [
      "Access to deal database",
      "Market trend reports",
      "Basic analytics dashboard",
      "Email alerts",
      "Standard support"
    ],
    popular: false
  },
  {
    name: "Enterprise",
    price: "$899",
    period: "per month",
    description: "Advanced features for growing PE firms",
    features: [
      "Everything in Professional",
      "Advanced analytics & modeling",
      "Custom report generation",
      "API access",
      "Dedicated account manager",
      "Priority support"
    ],
    popular: true
  },
  {
    name: "Custom",
    price: "Contact us",
    period: "for pricing",
    description: "Tailored solutions for large institutions",
    features: [
      "Everything in Enterprise",
      "Custom data integrations",
      "White-label solutions",
      "On-premise deployment",
      "24/7 dedicated support",
      "Custom training & onboarding"
    ],
    popular: false
  }
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-32 bg-black relative overflow-hidden">
      {/* Wave pattern background */}
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full">
          <path 
            d="M0,300 C300,500 600,100 1200,400 L1200,800 L0,800 Z" 
            fill="url(#pricingWave)"
          />
          <defs>
            <linearGradient id="pricingWave" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(210 98% 55%)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="hsl(180 84% 40%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(142 76% 36%)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your
            <span className="block text-green-400">
              Intelligence Level
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Flexible pricing options designed to scale with your private equity intelligence needs.
          </p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative group hover:shadow-lift transition-all duration-300 hover:-translate-y-1 ${
                plan.popular 
                  ? 'ring-2 ring-green-400 shadow-glow bg-gray-900/80 backdrop-blur-sm' 
                  : 'bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70 border-gray-800'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center px-4 py-1 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm font-medium">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-white">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-white/70 ml-2">
                    {plan.period}
                  </span>
                </div>
                <CardDescription className="mt-4 text-base text-white/70">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white' 
                      : 'border border-gray-700 bg-gray-800 hover:bg-gray-700 text-white'
                  } transition-all duration-300 hover:scale-105 rounded-full`}
                  size="lg"
                >
                  {plan.name === "Custom" ? "Contact Sales" : "Start Free Trial"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Bottom Note */}
        <div className="text-center mt-16">
          <p className="text-white/70">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}
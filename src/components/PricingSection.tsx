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
    <section id="pricing" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Choose Your
            <span className="block bg-gradient-text bg-clip-text text-transparent">
              Intelligence Level
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                  ? 'ring-2 ring-primary shadow-glow bg-gradient-card' 
                  : 'bg-background hover:bg-gradient-card/30'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center px-4 py-1 rounded-full bg-gradient-button text-white text-sm font-medium">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-card-foreground">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    {plan.period}
                  </span>
                </div>
                <CardDescription className="mt-4 text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-accent-green mr-3 flex-shrink-0" />
                      <span className="text-card-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-button hover:shadow-glow' 
                      : 'variant-outline hover:bg-primary hover:text-primary-foreground'
                  } transition-all duration-300 hover:scale-105`}
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
          <p className="text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}
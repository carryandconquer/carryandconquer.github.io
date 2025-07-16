import { useEffect, useState } from "react"

interface StatItemProps {
  value: string
  label: string
  prefix?: string
  suffix?: string
  delay?: number
}

function StatItem({ value, label, prefix = "", suffix = "", delay = 0 }: StatItemProps) {
  const [currentValue, setCurrentValue] = useState(0)
  const numericValue = parseInt(value.replace(/[^\d]/g, ''))
  
  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0
      const duration = 2000
      const increment = numericValue / (duration / 16)
      
      const counter = setInterval(() => {
        start += increment
        if (start >= numericValue) {
          setCurrentValue(numericValue)
          clearInterval(counter)
        } else {
          setCurrentValue(Math.floor(start))
        }
      }, 16)
      
      return () => clearInterval(counter)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [numericValue, delay])
  
  const formatValue = (val: number) => {
    if (val >= 1000) {
      return `${prefix}${(val / 1000).toFixed(1)}K${suffix}`
    }
    return `${prefix}${val}${suffix}`
  }
  
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold bg-gradient-text bg-clip-text text-transparent mb-2">
        {numericValue >= 1000 ? formatValue(currentValue) : `${prefix}${currentValue}${suffix}`}
      </div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          <StatItem 
            value="2500" 
            label="Billion AUM Tracked"
            prefix="$"
            suffix="B+"
            delay={0}
          />
          <StatItem 
            value="10000" 
            label="Deals Analyzed"
            suffix="+"
            delay={200}
          />
          <StatItem 
            value="500" 
            label="PE Firms"
            suffix="+"
            delay={400}
          />
          <StatItem 
            value="95" 
            label="Data Accuracy"
            suffix="%"
            delay={600}
          />
        </div>
      </div>
    </section>
  )
}
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
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {numericValue >= 1000 ? formatValue(currentValue) : `${prefix}${currentValue}${suffix}`}
      </div>
      <div className="text-white/70 font-medium">{label}</div>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Subtle wave background */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 1200 400" className="absolute inset-0 w-full h-full">
          <path 
            d="M0,200 C300,100 600,300 1200,150 L1200,400 L0,400 Z" 
            fill="url(#statsWave)"
          />
          <defs>
            <linearGradient id="statsWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(142 76% 36%)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="hsl(180 84% 40%)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(210 98% 55%)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
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
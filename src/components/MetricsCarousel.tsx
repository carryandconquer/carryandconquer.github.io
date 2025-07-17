import { TrendingUp, TrendingDown } from "lucide-react"

const metricsData = [
  {
    label: "PE DRY POWDER",
    value: "$3.7T",
    change: "+8.3%",
    isPositive: true
  },
  {
    label: "AVERAGE DEAL SIZE",
    value: "$124M",
    change: "-2.1%",
    isPositive: false
  },
  {
    label: "FUND DEPLOYMENT",
    value: "67%",
    change: "+12.4%",
    isPositive: true
  },
  {
    label: "EXIT MULTIPLE",
    value: "2.8x",
    change: "+5.7%",
    isPositive: true
  },
  {
    label: "ACTIVE FUNDS",
    value: "8,947",
    change: "+15.2%",
    isPositive: true
  },
  {
    label: "PORTFOLIO COMPANIES",
    value: "11,200+",
    change: "+9.8%",
    isPositive: true
  },
  {
    label: "MEDIAN IRR",
    value: "14.2%",
    change: "-1.3%",
    isPositive: false
  },
  {
    label: "FUNDRAISING YTD",
    value: "$901B",
    change: "+22.1%",
    isPositive: true
  }
]

export function MetricsCarousel() {
  // Duplicate the data to create seamless loop
  const duplicatedMetrics = [...metricsData, ...metricsData]

  return (
    <div className="bg-slate-900 border-b border-slate-700 overflow-hidden">
      <div className="relative">
        <div className="flex animate-scroll items-center whitespace-nowrap">
          {duplicatedMetrics.map((metric, index) => (
            <div key={index} className="flex items-center px-6 py-3 min-w-fit">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 text-sm font-medium">
                  {metric.label}
                </span>
                <span className="text-white font-bold text-sm">
                  {metric.value}
                </span>
                <div className={`flex items-center space-x-1 ${
                  metric.isPositive ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-xs font-medium">{metric.change}</span>
                </div>
              </div>
              <div className="w-px h-4 bg-slate-600 ml-6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
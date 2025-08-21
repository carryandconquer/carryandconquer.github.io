import { TrendingUp, TrendingDown } from "lucide-react"
import { useHeaderMetrics } from "@/hooks/useHeaderMetrics"

export function MetricsCarousel() {
  const { metrics, isLoading } = useHeaderMetrics()

  // If loading or no data, show skeleton or return early
  if (isLoading || metrics.length === 0) {
    return (
      <div className="bg-slate-900 border-b border-slate-700 overflow-hidden">
        <div className="relative">
          <div className="flex animate-scroll items-center whitespace-nowrap">
            {/* Skeleton loading state */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex items-center px-6 py-3 min-w-fit">
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-20 bg-slate-600 animate-pulse rounded" />
                  <div className="h-4 w-16 bg-slate-700 animate-pulse rounded" />
                  <div className="h-4 w-12 bg-slate-600 animate-pulse rounded" />
                </div>
                <div className="w-px h-4 bg-slate-600 ml-6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Transform metrics to match the old format and duplicate for seamless loop
  const transformedMetrics = metrics.map(metric => ({
    label: metric.label,
    value: metric.value,
    change: `${metric.is_positive ? '+' : ''}${metric.change_percentage}%`,
    isPositive: metric.is_positive
  }))

  const duplicatedMetrics = [...transformedMetrics, ...transformedMetrics]

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
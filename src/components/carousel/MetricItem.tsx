import { TrendingUp, TrendingDown } from "lucide-react"
import { HeaderMetric } from "@/hooks/useHeaderMetrics"
import { getIconComponent } from "@/lib/iconUtils"

interface MetricItemProps {
  metric: HeaderMetric
  index: number
}

export function MetricItem({ metric }: MetricItemProps) {
  const IconComponent = getIconComponent(metric.icon_name || 'TrendingUp')

  return (
    <div className="flex items-center px-6 py-3 min-w-fit">
      <div className="flex items-center space-x-2">
        <span className="text-slate-400 text-sm font-medium">
          {metric.label}
        </span>
        <span className="text-white font-bold text-sm">
          {metric.value}
        </span>
        {metric.change_percentage !== null && (
          <div className={`flex items-center space-x-1 ${
            metric.is_positive ? 'text-green-400' : 'text-red-400'
          }`}>
            {metric.is_positive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span className="text-xs font-medium">
              {metric.is_positive ? '+' : ''}{metric.change_percentage}%
            </span>
          </div>
        )}
      </div>
      <div className="w-px h-4 bg-slate-600 ml-6" />
    </div>
  )
}
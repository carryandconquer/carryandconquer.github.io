import { HeaderMetric } from "@/hooks/useHeaderMetrics"
import { getIconComponent } from "@/lib/iconUtils"
import { getColorClasses } from "@/lib/colorUtils"

interface BreakingItemProps {
  metric: HeaderMetric
  index: number
}

export function BreakingItem({ metric }: BreakingItemProps) {
  const IconComponent = getIconComponent(metric.icon_name || 'Zap')
  const { textColor, bgColor } = getColorClasses(metric.color_scheme || 'warning')

  return (
    <div className="flex items-center px-6 py-3 min-w-fit">
      <div className="flex items-center space-x-3">
        <div className={`p-1 rounded animate-pulse ${bgColor}`}>
          <IconComponent className={`w-3 h-3 ${textColor}`} />
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-bold uppercase tracking-wide ${textColor} animate-pulse`}>
            {metric.label}
          </span>
          <span className="text-white font-bold text-sm">
            {metric.title}
          </span>
        </div>
      </div>
      <div className="w-px h-4 bg-slate-600 ml-6" />
    </div>
  )
}
import { HeaderMetric } from "@/hooks/useHeaderMetrics"
import { getIconComponent } from "@/lib/iconUtils"
import { getColorClasses } from "@/lib/colorUtils"

interface NewsItemProps {
  metric: HeaderMetric
  index: number
}

export function NewsItem({ metric }: NewsItemProps) {
  const IconComponent = getIconComponent(metric.icon_name || 'MessageSquare')
  const { textColor, bgColor } = getColorClasses(metric.color_scheme || 'default')

  return (
    <div className="flex items-center px-6 py-3 min-w-fit">
      <div className="flex items-center space-x-3">
        <div className={`p-1 rounded ${bgColor}`}>
          <IconComponent className={`w-3 h-3 ${textColor}`} />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold text-sm">
            {metric.title}
          </span>
          {metric.description && (
            <span className="text-slate-400 text-xs">
              {metric.description}
            </span>
          )}
        </div>
      </div>
      <div className="w-px h-4 bg-slate-600 ml-6" />
    </div>
  )
}
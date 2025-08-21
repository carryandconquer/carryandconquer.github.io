import { useHeaderMetrics } from "@/hooks/useHeaderMetrics"
import { CarouselItemRenderer } from "@/components/carousel/CarouselItemRenderer"

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

  // Duplicate metrics for seamless loop (already sorted by order_index from DB)
  const duplicatedMetrics = [...metrics, ...metrics]

  return (
    <div className="bg-slate-900 border-b border-slate-700 overflow-hidden">
      <div className="relative">
        <div className="flex animate-scroll items-center whitespace-nowrap">
          {duplicatedMetrics.map((metric, index) => (
            <CarouselItemRenderer key={`${metric.id}-${index}`} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
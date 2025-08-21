import { HeaderMetric } from "@/hooks/useHeaderMetrics"
import { MetricItem } from "./MetricItem"
import { NewsItem } from "./NewsItem"
import { DealItem } from "./DealItem"
import { FundraisingItem } from "./FundraisingItem"
import { ExitItem } from "./ExitItem"
import { BreakingItem } from "./BreakingItem"
import { IntelligenceItem } from "./IntelligenceItem"

interface CarouselItemRendererProps {
  metric: HeaderMetric
  index: number
}

export function CarouselItemRenderer({ metric, index }: CarouselItemRendererProps) {
  const commonProps = { metric, index }

  switch (metric.item_type) {
    case 'metric':
      return <MetricItem {...commonProps} />
    case 'news':
      return <NewsItem {...commonProps} />
    case 'deal':
      return <DealItem {...commonProps} />
    case 'fundraising':
      return <FundraisingItem {...commonProps} />
    case 'exit':
      return <ExitItem {...commonProps} />
    case 'breaking':
      return <BreakingItem {...commonProps} />
    case 'intelligence':
      return <IntelligenceItem {...commonProps} />
    default:
      return <MetricItem {...commonProps} />
  }
}
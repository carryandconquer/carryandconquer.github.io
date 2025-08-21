import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
  Handshake,
  Rocket,
  Trophy,
  Zap,
  Target,
  BarChart3,
  MessageSquare,
  Building,
  Server,
  type LucideIcon
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
  Handshake,
  Rocket,
  Trophy,
  Zap,
  Target,
  BarChart3,
  MessageSquare,
  Building,
  Server,
}

export function getIconComponent(iconName: string): LucideIcon {
  return iconMap[iconName] || TrendingUp
}
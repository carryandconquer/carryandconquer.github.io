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
  AlertTriangle,
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
  AlertTriangle,
}

export function getIconComponent(iconName: string): LucideIcon {
  return iconMap[iconName] || TrendingUp
}
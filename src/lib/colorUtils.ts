export function getColorClasses(colorScheme: string) {
  const colorMap = {
    default: {
      textColor: 'text-slate-400',
      bgColor: 'bg-slate-700/50'
    },
    success: {
      textColor: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    warning: {
      textColor: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    danger: {
      textColor: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    info: {
      textColor: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    purple: {
      textColor: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    }
  }

  return colorMap[colorScheme as keyof typeof colorMap] || colorMap.default
}
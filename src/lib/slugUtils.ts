/**
 * Generates a URL-friendly slug from a name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim() // Remove leading/trailing whitespace
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Formats a name for display purposes
 */
export function formatDisplayName(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Normalizes taxonomy labels so "&" and "and" are treated the same,
 * and formatting differences don't break equality checks.
 */
export function normalizeTaxonomy(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\band\b/g, 'and')
    .replace(/[^a-z0-9]+/g, '-') // collapse to hyphen-separated
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Patrones para detectar componentes en el texto del diario
export const COMPONENT_PATTERNS = {
  groupsets: /(?:shimano|sram|campagnolo|sunrace)\s+\d{1,2}s?\s+(?:ultegra|105|force|apex|rival|red|record|veloce|claris|rival|apex|force|tiagra|centaur|potenza|skeleton|sora|105|ultegra|grx|rx|rs|etap|zepp|cx)/gi,
  cassettes: /(?:shimano|sram|campagnolo|sunrace)\s+\d{1,2}s?\s+(?:cs|hg|hg-\d+|pg-\d+|mt-\d+|hyperglide|csl|cn|microshift|nx|mx|pg-\d+|road|mountain|gravel)/gi,
  wheels: /(?:zipp|dt swiss|mavic|enve|shimano|easton|ffwd|reynolds|fulcrum|hunt|ax-lightness|carbon-ti|elitewheels|vision)\s+\w+/gi,
  tires: /(?:continental|schwalbe|panaracer|maxxis|vittoria|gatorskin|specialized|bontrager|goodyear|michelin|pirelli| Hutchinson)\s+\w+/gi,
  brakes: /(?:shimano|sram|trp|magura|hope|formula|trickstuff|hayes|tech|brake|mt\d+|mt\d+|mtb)/gi,
  handlebars: /(?:zipp|raceface|pro|easton|enve|deda|ritcheey|3t|ritchey|syntace|fsa|controltech|bontrager|raceface)\s+(?:bar|dropbar|aerobar|compact)/gi,
  saddles: /(?:brook|selle|san|specialized|fizik|prologo|terry|ism|selle|bontrager|fabric|wtb)\s+(?:royale|santa|novus|smp|slr|punto|diva|power|antares|manas|anatomica|flow|team|turbo|c|mod|short|medium)/gi,
  pedals: /(?:shimano|speedplay|look|time|crankbrothers|wk|garmin|favero|evo|dmt)\s+(?:xco|quarq|spd|sl|pedal|rs|xc|enduro|mx)/gi,
  drivetrain: /(?:shimano|sram|campagnolo)\s+(?:chain|chainring|crankset|bottombracket|derailleur|cassette|crank|bb)/gi,
}

// Detecta componentes mencionados en el texto
export function detectMentionedComponents(text: string): string[] {
  const detected: string[] = []

  Object.values(COMPONENT_PATTERNS).forEach(pattern => {
    const matches = text.match(pattern)
    if (matches) {
      detected.push(...matches)
    }
  })

  return [...new Set(detected)] // Eliminar duplicados
}

// Determina la categoría de un componente basado en los patrones
export function determineComponentCategory(componentName: string): 'groupset' | 'wheels' | 'tires' | 'brakes' | 'drivetrain' | 'handlebars' | 'saddle' | 'pedals' | 'other' | null {
  const lower = componentName.toLowerCase()

  for (const [category, pattern] of Object.entries(COMPONENT_PATTERNS)) {
    if (pattern.test(lower)) {
      return category as any
    }
  }

  return 'other'
}

// Formatea fecha para mostrar
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return 'Hoy'
  if (days === 1) return 'Ayer'
  if (days < 7) return `Hace ${days} días`
  if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`

  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Formatea etiquetas para mostrar
export function formatTags(tags: string[]): string[] {
  const tagColors: Record<string, string> = {
    '#compra': 'bg-green-100 text-green-800',
    '#prueba': 'bg-blue-100 text-blue-800',
    '#idea': 'bg-purple-100 text-purple-800',
    '#instalación': 'bg-orange-100 text-orange-800',
  }

  return tags.map(tag => ({
    name: tag,
    color: tagColors[tag] || 'bg-gray-100 text-gray-800'
  }))
}

// Valida tipo de bicicleta
export function isValidBikeType(type: string): type is 'road' | 'mtb' | 'gravel' | 'urban' {
  return ['road', 'mtb', 'gravel', 'urban'].includes(type)
}

// Genera slug amigable para URLs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
}

// Truncar texto con ellipsis
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

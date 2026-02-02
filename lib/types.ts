// Tipos de la aplicación
export interface User {
  id: string
  email: string
  name: string
  avatar_url: string | null
  created_at: string
}

export type BikeType = 'road' | 'mtb' | 'gravel' | 'urban'

export interface Bike {
  id: string
  user_id: string
  name: string
  type: BikeType
  description: string | null
  photo_url: string | null
  is_public: boolean
  current_version: number
  created_at: string
  updated_at: string
}

export interface BikeVersion {
  id: string
  bike_id: string
  version_number: number
  components_snapshot: Record<string, string> | null // Estado de componentes en este momento
  notes: string | null
  created_at: string
}

export interface DiaryEntry {
  id: string
  user_id: string
  bike_id: string | null // null = entrada general
  content: string
  photos: string[]
  tags: string[] // #compra, #prueba, #idea, #instalación
  mentioned_components: string[] | null
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface Component {
  id: string
  name: string // "Shimano 105 R7000"
  brand: string // "Shimano"
  category: 'groupset' | 'wheels' | 'tires' | 'brakes' | 'drivetrain' | 'handlebars' | 'saddle' | 'pedals' | 'other'
  specs: Record<string, string> | null
  affiliate_links: AffiliateLinks | null
  created_at: string
  updated_at: string
}

export interface AffiliateLinks {
  amazon: string | null
  chainreaction: string | null
  evans: string | null
  bike24: string | null
  wiggle: string | null
  // Agregar más según disponibilidad
}

export interface ComponentContext {
  id: string
  component_id: string
  source: 'reddit' | 'forum' | 'x' | 'manual'
  source_url: string
  summary: string
  sentiment: 'positive' | 'neutral' | 'negative'
  created_at: string
}

// Tipos de contexto de autenticación
export interface AuthUser {
  id: string
  email: string
  user_metadata: {
    name: string
    avatar_url: string
  }
}

export interface AuthResponse {
  user: AuthUser | null
  error: string | null
}

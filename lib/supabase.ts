import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Tipos para las tablas de Supabase
export type Database = {
  public: {
    Tables: {
      bikes: {
        Row: {
          id: string
          user_id: string
          name: string
          type: 'road' | 'mtb' | 'gravel' | 'urban'
          description: string | null
          photo_url: string | null
          is_public: boolean
          current_version: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          user_id: string
          name: string
          type: 'road' | 'mtb' | 'gravel' | 'urban'
          description: string | null
          photo_url: string | null
          is_public: boolean
          current_version: number
        }
        Update: {
          id: string
          user_id: string
          name: string
          type: 'road' | 'mtb' | 'gravel' | 'urban'
          description: string | null
          photo_url: string | null
          is_public: boolean
          current_version: number
          updated_at: string
        }
      }
      bike_versions: {
        Row: {
          id: string
          bike_id: string
          version_number: number
          components_snapshot: object | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id: string
          bike_id: string
          version_number: number
          components_snapshot: object | null
          notes: string | null
        }
      }
      diary_entries: {
        Row: {
          id: string
          user_id: string
          bike_id: string | null
          content: string
          photos: string[]
          tags: string[]
          mentioned_components: string[] | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          user_id: string
          bike_id: string | null
          content: string
          photos: string[]
          tags: string[]
          mentioned_components: string[] | null
          is_public: boolean
        }
        Update: {
          id: string
          user_id: string
          bike_id: string | null
          content: string
          photos: string[]
          tags: string[]
          mentioned_components: string[] | null
          is_public: boolean
          updated_at: string
        }
      }
      components: {
        Row: {
          id: string
          name: string
          brand: string
          category: 'groupset' | 'wheels' | 'tires' | 'brakes' | 'drivetrain' | 'handlebars' | 'saddle' | 'pedals' | 'other'
          specs: object | null
          affiliate_links: object | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          brand: string
          category: 'groupset' | 'wheels' | 'tires' | 'brakes' | 'drivetrain' | 'handlebars' | 'saddle' | 'pedals' | 'other'
          specs: object | null
          affiliate_links: object | null
        }
        Update: {
          id: string
          name: string
          brand: string
          category: 'groupset' | 'wheels' | 'tires' | 'brakes' | 'drivetrain' | 'drivetrain' | 'handlebars' | 'saddle' | 'pedals' | 'other'
          specs: object | null
          affiliate_links: object | null
          updated_at: string
        }
      }
      component_context: {
        Row: {
          id: string
          component_id: string
          source: 'reddit' | 'forum' | 'x' | 'manual'
          source_url: string
          summary: string
          sentiment: 'positive' | 'neutral' | 'negative'
          created_at: string
        }
        Insert: {
          id: string
          component_id: string
          source: 'reddit' | 'forum' | 'x' | 'manual'
          source_url: string
          summary: string
          sentiment: 'positive' | 'neutral' | 'negative'
        }
      }
    }
  }
}

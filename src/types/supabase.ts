export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      pixels: {
        Row: {
          id: string
          x: number
          y: number
          owner: string
          image_url: string | null
          link_url: string | null
          color: string | null
          start_x: number
          start_y: number
          end_x: number
          end_y: number
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          x: number
          y: number
          owner: string
          image_url?: string | null
          link_url?: string | null
          color?: string | null
          start_x: number
          start_y: number
          end_x: number
          end_y: number
          price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          x?: number
          y?: number
          owner?: string
          image_url?: string | null
          link_url?: string | null
          color?: string | null
          start_x?: number
          start_y?: number
          end_x?: number
          end_y?: number
          price?: number
          created_at?: string
          updated_at?: string
        }
      }
      pixel_history: {
        Row: {
          id: string
          pixel_id: string
          owner: string
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          pixel_id: string
          owner: string
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          pixel_id?: string
          owner?: string
          price?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
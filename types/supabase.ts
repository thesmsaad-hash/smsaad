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
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'admin' | 'editor' | 'reader'
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'editor' | 'reader'
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'editor' | 'reader'
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          icon_name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          icon_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          icon_name?: string | null
          created_at?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
        Relationships: []
      }
      content: {
        Row: {
          id: string
          type: 'knowledge' | 'workflow' | 'news' | 'glossary'
          status: 'Draft' | 'Review' | 'Scheduled' | 'Published' | 'Archived'
          slug: string
          title: string
          description: string | null
          body: string | null
          cover_image: string | null
          reading_time: string | null
          difficulty: string | null
          author_id: string | null
          category_id: string | null
          created_at: string
          updated_at: string
          published_at: string | null
          scheduled_at: string | null
          canonical_url: string | null
          og_title: string | null
          og_description: string | null
          robots: string | null
          json_schema: Json | null
          search_vector: unknown | null
        }
        Insert: {
          id?: string
          type: 'knowledge' | 'workflow' | 'news' | 'glossary'
          status?: 'Draft' | 'Review' | 'Scheduled' | 'Published' | 'Archived'
          slug: string
          title: string
          description?: string | null
          body?: string | null
          cover_image?: string | null
          reading_time?: string | null
          difficulty?: string | null
          author_id?: string | null
          category_id?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
          scheduled_at?: string | null
          canonical_url?: string | null
          og_title?: string | null
          og_description?: string | null
          robots?: string | null
          json_schema?: Json | null
          search_vector?: unknown | null
        }
        Update: {
          id?: string
          type?: 'knowledge' | 'workflow' | 'news' | 'glossary'
          status?: 'Draft' | 'Review' | 'Scheduled' | 'Published' | 'Archived'
          slug?: string
          title?: string
          description?: string | null
          body?: string | null
          cover_image?: string | null
          reading_time?: string | null
          difficulty?: string | null
          author_id?: string | null
          category_id?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
          scheduled_at?: string | null
          canonical_url?: string | null
          og_title?: string | null
          og_description?: string | null
          robots?: string | null
          json_schema?: Json | null
          search_vector?: unknown | null
        }
        Relationships: [
          {
            foreignKeyName: "content_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      content_tags: {
        Row: {
          content_id: string
          tag_id: string
        }
        Insert: {
          content_id: string
          tag_id: string
        }
        Update: {
          content_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_tags_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      slug_history: {
        Row: {
          id: string
          content_id: string
          old_slug: string
          new_slug: string
          created_at: string
        }
        Insert: {
          id?: string
          content_id: string
          old_slug: string
          new_slug: string
          created_at?: string
        }
        Update: {
          id?: string
          content_id?: string
          old_slug?: string
          new_slug?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "slug_history_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          }
        ]
      }
      content_versions: {
        Row: {
          id: string
          content_id: string
          version_number: number
          title: string
          description: string | null
          body: string | null
          editor_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          content_id: string
          version_number: number
          title: string
          description?: string | null
          body?: string | null
          editor_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          content_id?: string
          version_number?: number
          title?: string
          description?: string | null
          body?: string | null
          editor_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_versions_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_versions_editor_id_fkey"
            columns: ["editor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      tools: {
        Row: {
          id: string
          slug: string
          name: string
          tagline: string
          logo: string | null
          category: string | null
          pricing_model: string | null
          starting_price: string | null
          pricing_details: string | null
          rating: string | null
          rating_count: string | null
          os: string[] | null
          interface_type: string | null
          best_for: string | null
          strengths: Json | null
          weaknesses: Json | null
          is_featured: boolean | null
          created_at: string
          updated_at: string
          canonical_url: string | null
          og_title: string | null
          og_description: string | null
        }
        Insert: {
          id?: string
          slug: string
          name: string
          tagline: string
          logo?: string | null
          category?: string | null
          pricing_model?: string | null
          starting_price?: string | null
          pricing_details?: string | null
          rating?: string | null
          rating_count?: string | null
          os?: string[] | null
          interface_type?: string | null
          best_for?: string | null
          strengths?: Json | null
          weaknesses?: Json | null
          is_featured?: boolean | null
          created_at?: string
          updated_at?: string
          canonical_url?: string | null
          og_title?: string | null
          og_description?: string | null
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          tagline?: string
          logo?: string | null
          category?: string | null
          pricing_model?: string | null
          starting_price?: string | null
          pricing_details?: string | null
          rating?: string | null
          rating_count?: string | null
          os?: string[] | null
          interface_type?: string | null
          best_for?: string | null
          strengths?: Json | null
          weaknesses?: Json | null
          is_featured?: boolean | null
          created_at?: string
          updated_at?: string
          canonical_url?: string | null
          og_title?: string | null
          og_description?: string | null
        }
        Relationships: []
      }
      collections: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          cover_image: string | null
          category: string | null
          is_featured: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          cover_image?: string | null
          category?: string | null
          is_featured?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          cover_image?: string | null
          category?: string | null
          is_featured?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      collection_items: {
        Row: {
          collection_id: string
          item_type: string
          item_id: string
          position: number
          created_at: string
        }
        Insert: {
          collection_id: string
          item_type: string
          item_id: string
          position?: number
          created_at?: string
        }
        Update: {
          collection_id?: string
          item_type?: string
          item_id?: string
          position?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_items_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          }
        ]
      }
      media: {
        Row: {
          id: string
          storage_path: string
          folder: string
          mime_type: string
          size: number
          width: number | null
          height: number | null
          alt_text: string | null
          caption: string | null
          copyright: string | null
          dominant_color: string | null
          blurhash: string | null
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          storage_path: string
          folder?: string
          mime_type: string
          size: number
          width?: number | null
          height?: number | null
          alt_text?: string | null
          caption?: string | null
          copyright?: string | null
          dominant_color?: string | null
          blurhash?: string | null
          uploaded_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          storage_path?: string
          folder?: string
          mime_type?: string
          size?: number
          width?: number | null
          height?: number | null
          alt_text?: string | null
          caption?: string | null
          copyright?: string | null
          dominant_color?: string | null
          blurhash?: string | null
          uploaded_by?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_editor_or_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      user_role: 'admin' | 'editor' | 'reader'
      content_type: 'knowledge' | 'workflow' | 'news' | 'glossary'
      content_status: 'Draft' | 'Review' | 'Scheduled' | 'Published' | 'Archived'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never

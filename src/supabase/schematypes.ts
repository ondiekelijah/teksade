// These are type defination for the backend structure
// They allow end to end type safety when accesing the  API

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      communities: {
        Row: {
          // teckstack can replace category, more descriptive
          category: string[] | null;
          contacts: string | null;
          country: string[];
          cover_image: string;
          created_at: string | null;
          created_by: string;
          description: string | null;
          id: string;
          images: string[] | null;
          location: string | null;
          members: string[] | null;
          name: string;
          rating : number | null;
          twitter_url:string;
          verified: boolean | null;
          
        };
      
        Insert: {
          category?: string[] | null;
          contacts?: string | null;
          country: string[];
          cover_image?: string;
          created_at?: string | null;
          created_by: string;
          description?: string | null;
          id?: string;
          images?: string[] | null;
          location?: string | null;
          members?: string[] | null;
          name: string;
          rating?: number | null;
          twitter_url?:string;
          verified?: boolean | null;
        };
        Update: {
          category?: string[] | null;
          contacts?: string | null;
          country?: string[];
          cover_image?: string;
          created_at?: string | null;
          created_by?: string;
          describtion?: string | null;
          id?: string;
          images?: string[] | null;
          location?: string | null;
          members?: string[] | null;
          name?: string;
          rating?: number | null;
          twitter_url?:string;
          verified?: boolean | null;
        };
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          institution: string | null;
          role: string | null;
          updated_at: string | null;
          username: string | null;
          verified: boolean;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          institution?: string | null;
          role?: string | null;
          updated_at?: string | null;
          username?: string | null;
          verified?: boolean;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          institution?: string | null;
          role?: string | null;
          updated_at?: string | null;
          username?: string | null;
          verified?: boolean;
          website?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

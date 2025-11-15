import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          avatar?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          avatar?: string | null;
          created_at?: string;
        };
      };
      brand_kits: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          logo: string | null;
          colors: any;
          fonts: any;
          profile_picture: string | null;
          signature_tag: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          logo?: string | null;
          colors: any;
          fonts: any;
          profile_picture?: string | null;
          signature_tag?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          logo?: string | null;
          colors?: any;
          fonts?: any;
          profile_picture?: string | null;
          signature_tag?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      drafts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          carousel_data: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          carousel_data: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          carousel_data?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
